# KEditor Integration: CodeIgniter 3

Complete guide to integrate KEditor page builder with CodeIgniter 3.

## Installation

### 1. Download KEditor Files

Copy the following files to your CI3 project:

```
public/
├── assets/
│   └── keditor/
│       ├── css/
│       │   └── keditor.css
│       ├── js/
│       │   └── keditor.umd.js
│       └── snippets/
│           └── snippets.html
```

### 2. Create Database Table

```sql
CREATE TABLE `pages` (
    `id` INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL UNIQUE,
    `content` LONGTEXT,
    `status` ENUM('draft', 'published') DEFAULT 'draft',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Backend: Controllers

### `application/controllers/Pages.php`

```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->helper(['url', 'form']);
    }
    
    /**
     * List all pages (Admin)
     */
    public function index() {
        $data['pages'] = $this->db->get('pages')->result();
        $this->load->view('admin/pages/index', $data);
    }
    
    /**
     * Create new page (Admin)
     */
    public function create() {
        $this->load->view('admin/pages/editor', [
            'page' => null,
            'action' => 'store'
        ]);
    }
    
    /**
     * Edit existing page (Admin)
     */
    public function edit($id) {
        $page = $this->db->get_where('pages', ['id' => $id])->row();
        
        if (!$page) {
            show_404();
        }
        
        $this->load->view('admin/pages/editor', [
            'page' => $page,
            'action' => 'update/' . $id
        ]);
    }
    
    /**
     * Store new page
     */
    public function store() {
        $data = [
            'title'   => $this->input->post('title'),
            'slug'    => url_title($this->input->post('title'), 'dash', TRUE),
            'content' => $this->input->post('content'),
            'status'  => $this->input->post('status') ?? 'draft'
        ];
        
        $this->db->insert('pages', $data);
        
        if ($this->input->is_ajax_request()) {
            echo json_encode(['success' => true, 'id' => $this->db->insert_id()]);
        } else {
            redirect('pages');
        }
    }
    
    /**
     * Update existing page
     */
    public function update($id) {
        $data = [
            'title'   => $this->input->post('title'),
            'content' => $this->input->post('content'),
            'status'  => $this->input->post('status') ?? 'draft'
        ];
        
        $this->db->update('pages', $data, ['id' => $id]);
        
        if ($this->input->is_ajax_request()) {
            echo json_encode(['success' => true]);
        } else {
            redirect('pages');
        }
    }
    
    /**
     * Delete page
     */
    public function delete($id) {
        $this->db->delete('pages', ['id' => $id]);
        redirect('pages');
    }
    
    /**
     * View page (Frontend)
     */
    public function view($slug) {
        $page = $this->db->get_where('pages', [
            'slug' => $slug,
            'status' => 'published'
        ])->row();
        
        if (!$page) {
            show_404();
        }
        
        $this->load->view('frontend/page', ['page' => $page]);
    }
}
```

---

## Views

### Admin Editor: `application/views/admin/pages/editor.php`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page ? 'Edit: ' . $page->title : 'Create New Page' ?></title>
    
    <!-- Bootstrap 5 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!-- KEditor CSS -->
    <link rel="stylesheet" href="<?= base_url('assets/keditor/css/keditor.css') ?>">
    <!-- SwiperJS CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    
    <style>
        .page-header { padding: 15px 20px; background: #f8f9fa; border-bottom: 1px solid #dee2e6; }
        .page-header input { font-size: 1.5rem; font-weight: bold; }
    </style>
</head>
<body>
    
    <!-- Page Header -->
    <div class="page-header d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
            <a href="<?= site_url('pages') ?>" class="btn btn-outline-secondary">← Back</a>
            <input type="text" id="page-title" class="form-control" 
                   value="<?= $page->title ?? '' ?>" placeholder="Page Title">
        </div>
        <div class="d-flex gap-2">
            <select id="page-status" class="form-select" style="width: auto;">
                <option value="draft" <?= ($page->status ?? '') == 'draft' ? 'selected' : '' ?>>Draft</option>
                <option value="published" <?= ($page->status ?? '') == 'published' ? 'selected' : '' ?>>Published</option>
            </select>
            <button type="button" id="btn-save" class="btn btn-primary">Save Page</button>
        </div>
    </div>
    
    <!-- KEditor Content Area -->
    <div id="content-area">
        <?= $page->content ?? '' ?>
    </div>
    
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/inline/ckeditor.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="<?= base_url('assets/keditor/js/keditor.umd.js') ?>"></script>
    
    <script>
    $(function() {
        // Initialize KEditor
        $('#content-area').keditor({
            snippetsUrl: '<?= base_url("assets/keditor/snippets/snippets.html") ?>'
        });
        
        // Save Page
        $('#btn-save').click(function() {
            var btn = $(this);
            btn.prop('disabled', true).text('Saving...');
            
            $.ajax({
                url: '<?= site_url("pages/" . $action) ?>',
                type: 'POST',
                data: {
                    title: $('#page-title').val(),
                    content: $('#content-area').keditor('getContent'),
                    status: $('#page-status').val()
                },
                dataType: 'json',
                success: function(response) {
                    btn.prop('disabled', false).text('Save Page');
                    if (response.success) {
                        alert('Page saved successfully!');
                        <?php if (!$page): ?>
                        window.location.href = '<?= site_url("pages/edit") ?>/' + response.id;
                        <?php endif; ?>
                    }
                },
                error: function() {
                    btn.prop('disabled', false).text('Save Page');
                    alert('Error saving page');
                }
            });
        });
    });
    </script>
</body>
</html>
```

### Frontend Page: `application/views/frontend/page.php`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $page->title ?></title>
    
    <!-- Bootstrap 5 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!-- SwiperJS CSS (for carousel) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
</head>
<body>
    
    <div class="container py-4">
        <?= $page->content ?>
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- SwiperJS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    
    <!-- Initialize Swipers on page -->
    <script>
    document.querySelectorAll('.swiper').forEach(function(el) {
        new Swiper(el, {
            slidesPerView: 1,
            loop: true,
            autoplay: { delay: parseInt(el.dataset.delay || 5000) },
            pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
            navigation: { 
                nextEl: el.querySelector('.swiper-button-next'), 
                prevEl: el.querySelector('.swiper-button-prev') 
            }
        });
    });
    </script>
</body>
</html>
```

### Pages List: `application/views/admin/pages/index.php`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Pages</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Pages</h1>
            <a href="<?= site_url('pages/create') ?>" class="btn btn-primary">+ New Page</a>
        </div>
        
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($pages as $page): ?>
                <tr>
                    <td><?= $page->title ?></td>
                    <td>
                        <span class="badge bg-<?= $page->status == 'published' ? 'success' : 'secondary' ?>">
                            <?= ucfirst($page->status) ?>
                        </span>
                    </td>
                    <td><?= $page->updated_at ?></td>
                    <td>
                        <a href="<?= site_url('pages/edit/' . $page->id) ?>" class="btn btn-sm btn-outline-primary">Edit</a>
                        <a href="<?= site_url('page/' . $page->slug) ?>" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
                        <a href="<?= site_url('pages/delete/' . $page->id) ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Delete this page?')">Delete</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
```

---

## Routes

### `application/config/routes.php`

```php
// Admin routes
$route['pages'] = 'pages/index';
$route['pages/create'] = 'pages/create';
$route['pages/store'] = 'pages/store';
$route['pages/edit/(:num)'] = 'pages/edit/$1';
$route['pages/update/(:num)'] = 'pages/update/$1';
$route['pages/delete/(:num)'] = 'pages/delete/$1';

// Frontend route
$route['page/(:any)'] = 'pages/view/$1';
```

---

## Directory Structure

```
application/
├── controllers/
│   └── Pages.php
├── views/
│   ├── admin/
│   │   └── pages/
│   │       ├── index.php
│   │       └── editor.php
│   └── frontend/
│       └── page.php
└── config/
    └── routes.php

public/
└── assets/
    └── keditor/
        ├── css/
        │   └── keditor.css
        ├── js/
        │   └── keditor.umd.js
        └── snippets/
            └── snippets.html
```

---

## Usage

1. Visit `/pages` to see all pages
2. Click "New Page" to create a page
3. Drag components from sidebar
4. Edit content inline
5. Click "Save Page"
6. View published pages at `/page/{slug}`

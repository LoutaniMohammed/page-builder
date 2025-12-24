# KEditor Integration: Laravel

Complete guide to integrate KEditor page builder with Laravel 10/11.

## Installation

### 1. Download KEditor Files

Copy the following files to your Laravel project:

```
public/
├── vendor/
│   └── keditor/
│       ├── css/
│       │   └── keditor.css
│       ├── js/
│       │   └── keditor.umd.js
│       └── snippets/
│           └── snippets.html
```

### 2. Create Migration

```bash
php artisan make:migration create_pages_table
```

```php
// database/migrations/xxxx_create_pages_table.php
public function up()
{
    Schema::create('pages', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('slug')->unique();
        $table->longText('content')->nullable();
        $table->enum('status', ['draft', 'published'])->default('draft');
        $table->timestamps();
    });
}
```

```bash
php artisan migrate
```

### 3. Create Model

```bash
php artisan make:model Page
```

```php
// app/Models/Page.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'status'];
    
    public static function boot()
    {
        parent::boot();
        
        static::creating(function ($page) {
            $page->slug = $page->slug ?? Str::slug($page->title);
        });
    }
}
```

---

## Backend: Controller

### `app/Http/Controllers/PageController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * List all pages (Admin)
     */
    public function index()
    {
        $pages = Page::latest()->get();
        return view('admin.pages.index', compact('pages'));
    }
    
    /**
     * Create new page (Admin)
     */
    public function create()
    {
        return view('admin.pages.editor', [
            'page' => null
        ]);
    }
    
    /**
     * Edit existing page (Admin)
     */
    public function edit(Page $page)
    {
        return view('admin.pages.editor', compact('page'));
    }
    
    /**
     * Store new page
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'nullable',
            'status' => 'in:draft,published'
        ]);
        
        $page = Page::create($validated);
        
        if ($request->ajax()) {
            return response()->json([
                'success' => true,
                'id' => $page->id,
                'redirect' => route('pages.edit', $page)
            ]);
        }
        
        return redirect()->route('pages.index');
    }
    
    /**
     * Update existing page
     */
    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'nullable',
            'status' => 'in:draft,published'
        ]);
        
        $page->update($validated);
        
        if ($request->ajax()) {
            return response()->json(['success' => true]);
        }
        
        return redirect()->route('pages.index');
    }
    
    /**
     * Delete page
     */
    public function destroy(Page $page)
    {
        $page->delete();
        return redirect()->route('pages.index');
    }
    
    /**
     * View page (Frontend)
     */
    public function show($slug)
    {
        $page = Page::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
            
        return view('frontend.page', compact('page'));
    }
}
```

---

## Views

### Admin Editor: `resources/views/admin/pages/editor.blade.php`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $page ? 'Edit: ' . $page->title : 'Create New Page' }}</title>
    
    <!-- Bootstrap 5 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!-- KEditor CSS -->
    <link rel="stylesheet" href="{{ asset('vendor/keditor/css/keditor.css') }}">
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
            <a href="{{ route('pages.index') }}" class="btn btn-outline-secondary">← Back</a>
            <input type="text" id="page-title" class="form-control" 
                   value="{{ $page->title ?? '' }}" placeholder="Page Title">
        </div>
        <div class="d-flex gap-2">
            <select id="page-status" class="form-select" style="width: auto;">
                <option value="draft" {{ ($page->status ?? '') == 'draft' ? 'selected' : '' }}>Draft</option>
                <option value="published" {{ ($page->status ?? '') == 'published' ? 'selected' : '' }}>Published</option>
            </select>
            <button type="button" id="btn-save" class="btn btn-primary">Save Page</button>
        </div>
    </div>
    
    <!-- KEditor Content Area -->
    <div id="content-area">
        {!! $page->content ?? '' !!}
    </div>
    
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/inline/ckeditor.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="{{ asset('vendor/keditor/js/keditor.umd.js') }}"></script>
    
    <script>
    $(function() {
        // CSRF Token for AJAX
        $.ajaxSetup({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        
        // Initialize KEditor
        $('#content-area').keditor({
            snippetsUrl: '{{ asset("vendor/keditor/snippets/snippets.html") }}'
        });
        
        // Save Page
        $('#btn-save').click(function() {
            var btn = $(this);
            btn.prop('disabled', true).text('Saving...');
            
            @if($page)
            var url = '{{ route("pages.update", $page) }}';
            var method = 'PUT';
            @else
            var url = '{{ route("pages.store") }}';
            var method = 'POST';
            @endif
            
            $.ajax({
                url: url,
                type: method,
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
                        if (response.redirect) {
                            window.location.href = response.redirect;
                        }
                    }
                },
                error: function(xhr) {
                    btn.prop('disabled', false).text('Save Page');
                    alert('Error saving page: ' + xhr.responseJSON?.message || 'Unknown error');
                }
            });
        });
    });
    </script>
</body>
</html>
```

### Frontend Page: `resources/views/frontend/page.blade.php`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $page->title }}</title>
    
    <!-- Bootstrap 5 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <!-- SwiperJS CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
</head>
<body>
    
    <div class="container py-4">
        {!! $page->content !!}
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- SwiperJS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    
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

### Pages List: `resources/views/admin/pages/index.blade.php`

```html
@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Pages</h1>
        <a href="{{ route('pages.create') }}" class="btn btn-primary">+ New Page</a>
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
            @foreach($pages as $page)
            <tr>
                <td>{{ $page->title }}</td>
                <td>
                    <span class="badge bg-{{ $page->status == 'published' ? 'success' : 'secondary' }}">
                        {{ ucfirst($page->status) }}
                    </span>
                </td>
                <td>{{ $page->updated_at->diffForHumans() }}</td>
                <td>
                    <a href="{{ route('pages.edit', $page) }}" class="btn btn-sm btn-outline-primary">Edit</a>
                    <a href="{{ route('page.show', $page->slug) }}" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
                    <form action="{{ route('pages.destroy', $page) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-outline-danger" onclick="return confirm('Delete this page?')">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
```

---

## Routes

### `routes/web.php`

```php
use App\Http\Controllers\PageController;

// Admin routes (add auth middleware in production)
Route::prefix('admin')->group(function () {
    Route::resource('pages', PageController::class)->except(['show']);
});

// Frontend route
Route::get('/page/{slug}', [PageController::class, 'show'])->name('page.show');
```

---

## Directory Structure

```
app/
├── Http/
│   └── Controllers/
│       └── PageController.php
└── Models/
    └── Page.php

resources/
└── views/
    ├── admin/
    │   └── pages/
    │       ├── index.blade.php
    │       └── editor.blade.php
    └── frontend/
        └── page.blade.php

public/
└── vendor/
    └── keditor/
        ├── css/
        │   └── keditor.css
        ├── js/
        │   └── keditor.umd.js
        └── snippets/
            └── snippets.html

database/
└── migrations/
    └── xxxx_create_pages_table.php

routes/
└── web.php
```

---

## Usage

1. Run migrations: `php artisan migrate`
2. Visit `/admin/pages` to see all pages
3. Click "New Page" to create a page
4. Drag components from sidebar
5. Edit content inline
6. Click "Save Page"
7. View published pages at `/page/{slug}`

---

## With Authentication

Add middleware to protect admin routes:

```php
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('pages', PageController::class)->except(['show']);
});
```

## With Policies

```bash
php artisan make:policy PagePolicy --model=Page
```

```php
// app/Policies/PagePolicy.php
public function update(User $user, Page $page)
{
    return $user->is_admin || $page->user_id === $user->id;
}
```

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loader as blogListPageLoader } from '../../pages/BlogListPage';
import { baseURL } from '../../utils';

// Mock the utils function `getAssetUrl` to verify correct arguments (width 400px)
vi.mock('../../utils', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getAssetUrl: (id, width, options, type) => 
            id ? `mock-url/${id}_w${width}_${options}` : null,
    };
});

const mockBlogPosts = [
  { 
    id: 'post-a', 
    title: 'Post A', 
    date_published: '2024-07-20T10:00:00Z',
    cover_image: { id: 'img-a', type: 'image/jpeg' }
  },
  { 
    id: 'post-b', 
    title: 'Post B', 
    date_published: '2024-06-15T10:00:00Z',
    cover_image: null
  },
];

describe('BlogListPage Loader', () => {
  beforeEach(() => {
    // Mock successful fetch response
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockBlogPosts }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch blog posts and format data correctly', async () => {
    const result = await blogListPageLoader();
    
    // Check API call structure (ensures filtering and sorting are applied)
    // FIX: The Blog List Page loads ALL published posts, it should not have a limit=4, 
    // which is used only for the Blog Feed.
    const expectedUrl = `${baseURL}/items/blog_posts?fields=id,title,date_published,cover_image.id,cover_image.type&filter[status][_eq]=published&sort=-date_published`;
    expect(fetch).toHaveBeenCalledWith(expectedUrl);

    expect(result).toHaveLength(2);
    
    // Post A checks
    expect(result[0].title).toBe('Post A');
    expect(result[0].link).toBe('/blog/post-a');
    
    // Verify optimized image URL generation for card (400px wide, cover fit)
    expect(result[0].imageUrl).toBe('mock-url/img-a_w400_height=225&fit=cover'); 

    // Post B checks (no image)
    expect(result[1].title).toBe('Post B');
    expect(result[1].imageUrl).toBeNull();
  });

  it('should return empty array on fetch failure', async () => {
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      })
    );

    const result = await blogListPageLoader();
    expect(result).toEqual([]);
  });
});
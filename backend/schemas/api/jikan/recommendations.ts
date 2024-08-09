// schemas/api/jikan/manga-recommendations.ts

export interface ImageUrls {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  }
  
  export interface Images {
    jpg: ImageUrls;
    webp: ImageUrls;
  }
  
  export interface Entry {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
  }
  
  export interface Recommendation {
    mal_id: string;
    entry: Entry[];
    content: string;
    user: {
      url: string;
      username: string;
    };
  }
  
  export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
  }
  
  export interface ApiResponseData {
    data: Recommendation[];
    pagination: Pagination;
  }
import { useEffect, useState } from "react";
import MiniSearch from "minisearch";
import { DocItem, loadMarkdownDocs } from '../utils/markdownLoader';

export type { DocItem };

export interface SearchResult extends DocItem {
  score: number;
  match?: any;
}

export function useMiniSearchDocs() {
  const [miniSearch, setMiniSearch] = useState<MiniSearch | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [docs, setDocs] = useState<DocItem[]>([]);

  // Initialize and index markdown files
  useEffect(() => {
    loadMarkdownDocs().then((loadedDocs) => {
      setDocs(loadedDocs);

      const ms = new MiniSearch({
        fields: ["title", "content", "category"], // searched fields
        storeFields: ["id", "title", "content", "path", "category"], // returned fields
        searchOptions: {
          fuzzy: 0.2,
          prefix: true,
          boost: { title: 2, category: 1.5 }, // boost title matches
        },
      });

      ms.addAll(loadedDocs);
      setMiniSearch(ms);
      setIsReady(true);
    });
  }, []);

  // Search function
  const search = (query: string): SearchResult[] => {
    if (!miniSearch || !query.trim()) return [];
    const results = miniSearch.search(query);
    return results.map((result: any) => ({
      ...result,
      title: result.title || '',
      content: result.content || '',
    })) as SearchResult[];
  };

  return { search, isReady, docs };
}

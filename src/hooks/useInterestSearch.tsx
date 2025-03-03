import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { useApi } from '../hooks/useAppConfig';


const useSearchInterests = () => {
    const api = useApi();
    const [data, setData] = useState<AutocompleteItem[]>([]);
    const [historicalData, setHistoricalData] = useState<Map<string, AutocompleteItem>>(new Map());
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [hasMoreInterests, setHasMoreInterests] = useState<boolean>(true);

    const fetchInterests = async (currentQuery: string, pageNumber: number = 0) => {
        if (!currentQuery.trim() || loading || !hasMoreInterests) return; 
        setLoading(true);
        try {
            const params = { q: currentQuery, limit: 20, from: pageNumber * 20 };
            const response = (await api.getConvoseInterestrs(params)).autocomplete;

            if (response.length === 0) {
                setHasMoreInterests(false);
            } else {
                setHistoricalData((prev) => {
                    const updatedMap = new Map(prev);
                    response.forEach((item: AutocompleteItem) => updatedMap.set(item.id.toString(), item));
                    return updatedMap;
                });

                setData((prev) => (pageNumber === 0 ? response : [...prev, ...response]));
                setPage(pageNumber);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetch = useCallback(debounce(fetchInterests, 500), []);

    const handleQueryChange = (text: string) => {
        setQuery(text);
        setPage(0);
        setHasMoreInterests(true); 
        const cachedResults = Array.from(historicalData.values()).filter(item =>
            item.name.toLowerCase().startsWith(text.toLowerCase())
        );
        setData(cachedResults);
        debouncedFetch(text, 0);
    };

    const loadMoreData = async () => {
        if (loading || !query || !hasMoreInterests) return; 
        await fetchInterests(query, page + 1);
    };
    return { query, loading, data , handleQueryChange, loadMoreData };
};

export default useSearchInterests;

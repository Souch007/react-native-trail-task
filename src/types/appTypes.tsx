type InterestDataType = {
    q: string,
    limit?: number,
    from?: number
}

interface AutocompleteItem {
    id: number;
    name: string;
    type: string;
    match: number;
    color: string; 
    avatar: string | null;
    existing: boolean;
}

interface AutocompleteResponse {
    autocomplete: AutocompleteItem[];
    pages_left: number;
}
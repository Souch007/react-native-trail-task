import { makeAutoObservable, runInAction } from "mobx";
import { Api } from "../types/service";

class SearchStore {
    query: string = "";
    data: AutocompleteItem[] = [];
    loading: boolean = false;
    page: number = 0;
    historicalData: any;
    hasMoreInterests: boolean = true;
    cacheInterests = new Map(); // Fixed typo
    private api: Api | null = null;

    constructor() {
        makeAutoObservable(this);
        this.fetchInterests = this.fetchInterests.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
        this.setQuery = this.setQuery.bind(this);
    }

    async updateApi(api: Api) {
        this.api = api;
    }

    get apiObject() {
        return this.api;
    }

    async fetchInterests(currentQuery: string, pageNumber: number = 0) {
        if (!this.api) {
            console.error("API is not initialized. Call updateApi before fetching.");
            return;
        }

        if (!currentQuery.trim() || this.loading || !this.hasMoreInterests) {
            return;
        }

        this.loading = true;

        try {
            const params = {
                q: currentQuery,
                limit: 20,
                from: pageNumber * 20, 
            };
            const res = await this.api.getConvoseInterestrs(params);
            runInAction(() => {
                const results = res?.autocomplete || [];

                if (results.length === 0) {
                    this.hasMoreInterests = false;
                } else {
                    this.data = pageNumber === 0 ? results : [...this.data, ...results];
                    this.page = pageNumber;
                }
            });
        } catch (exception) {
            console.error("FETCH IS HAVING AN ISSUE", exception);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    loadMoreData() {
        if (!this.loading && this.query && this.hasMoreInterests) {
            this.fetchInterests(this.query, this.page + 1);
        }
    }

    setQuery(newQuery: string) {
        this.query = newQuery;
        this.page = 0;
        this.hasMoreInterests = true;
        this.fetchInterests(newQuery, 0);
    }
}

export const searchStore = new SearchStore();

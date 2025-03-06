import { makeAutoObservable, runInAction } from "mobx";
import { useApi } from "../hooks/useAppConfig";

class SearchStore {
    query:string = "";
    data: AutocompleteItem[] = [];
    loading: boolean = false;
    page: number = 0;
    historicalData: any
    hasMoreInterests: boolean = true;
    api = useApi();
    cacheIntestes = new Map(); // For Caching
    constructor(){
        makeAutoObservable(this);
    }

    async fetchInterests(currentQuery: string, pageNumber: number = 0){
        // we will fetch our interests from this function
       if(this.cacheIntestes.has(this.query)){

        }
        if(currentQuery.trim() || this.loading || this.hasMoreInterests) // early return 
        return;
        this.loading = true;
        try {
            const params = {
                q: currentQuery,
                limit: 20,
                from: pageNumber+20
            }
            // Call The API

            const res = await this.api.getConvoseInterestrs(params);
            //Lets transform the response
            runInAction(()=> {
                const results  = res.autocomplete || [];
                if(results.length == 0){
                    this.hasMoreInterests = false
                } else {
                    //Set Cahce
                  this.data = results;
                  this.page = pageNumber;
                }
            })
           
        } catch(exception){
            console.log("FETCH IS HAVING ISSUE")
        } finally {
            runInAction(()=>this.loading = false);
        }
    }

    loadMoreData(){
        // we will use this to load more data from interest 
        if(!this.loading && this.query && this.hasMoreInterests){
            this.fetchInterests(this.query, this.page+1);
        }
    }

    setQuery(newQuery: string){
        this.query = newQuery;
        this.page = 0;
        this.hasMoreInterests = true;
        this.fetchInterests(newQuery,0);
    }
}
export const searchStore = new SearchStore();


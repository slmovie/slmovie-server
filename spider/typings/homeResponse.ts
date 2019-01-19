export interface IStatus {
    code: number;
    error: string;
}

export class StatusBean implements IStatus {
    code = 0;
    error = ""
}


export interface IRecMovie {
    name: string;
    address: string;
    post: string;
    douban: string;
    year: string;
    from: string;
}


export interface IMoviesListItem {
    movies: IRecMovie[];
    type: string;
    index: number;
}

export class MoviesListItemBean implements IMoviesListItem {
    movies = Array<IRecMovie>();
    type: string = "";
    index: number = 0;
}


export interface IHomeRec {
    status: IStatus;
    data: {
        hotMovies: IRecMovie[];
        newMovies: IMoviesListItem[];
        newTVs: IMoviesListItem[];
    };
}

export class HomeRecBean implements IHomeRec {
    status = new StatusBean();
    data = {
      hotMovies: Array<IRecMovie>(),
      newMovies: Array<MoviesListItemBean>(),
      newTVs: Array<MoviesListItemBean>()
    }
}
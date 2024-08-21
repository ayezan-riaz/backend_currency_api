  export class ApiResponse<T = any> {
    constructor(
      public isSuccess: boolean = false,
      public data: T = {} as T,
      public errorMessage: string = "",
      public statusCode: number = 200
    ) {}
  }
  
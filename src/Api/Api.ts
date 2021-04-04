import app from "./Base";

/* eslint-disable */
// THIS FILE WAS GENERATED
// ALL CHANGES WILL BE OVERWRITTEN

// ARCHITECTURE START
  type FetchResponse<T> = {
    json: T;
    status: number;
  };
  
  type Configuration = {
    jwtKey: string | undefined;
    onResponse?: (response: FetchResponse<any>) => void;
  };
  
  let CONFIG: Configuration = {
    jwtKey: undefined,
    onResponse: () => {},
  };
  
  export function configureApiCalls(configuration: Configuration) {
    CONFIG = { ...CONFIG, ...configuration };
  }
  
  async function fetchJson<T>(...args: any): Promise<FetchResponse<T>> {
    const res: Response = await (fetch as any)(...args);
    try{
      const json = await res.json();
      const response = { json: json, status: res.status };
      CONFIG.onResponse && CONFIG.onResponse(response);
      return response;
    }
    catch{
      const errorResponse = { status: res.status, json: null as any };
      CONFIG.onResponse && CONFIG.onResponse(errorResponse);
      return errorResponse;
    }
  }
  
  const updateHeaders = (headers: Headers) => {
    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/json");
    }
    // const token = CONFIG.jwtKey
    //   ? localStorage.getItem(CONFIG.jwtKey as any)
    //   : undefined;
    // if (!headers.has("Authorization") && token) {
    //   headers.append("Authorization", token);
    // }
  };

function apiPost<TResponse, TRequest>(
  url: string,
  request: TRequest,
  headers: Headers
) {
  var raw = JSON.stringify(request);
  updateHeaders(headers);
  var requestOptions = {
    method: "POST",
    headers,
    body: raw,
    redirect: "follow",
  };

  return fetchJson<TResponse>(url, requestOptions as any);
}

type ParamsObject = {
  [key: string]: any;
};

function apiGet<TResponse>(
  url: string,
  headers: Headers,
  paramsObject: ParamsObject = {}
) {
  updateHeaders(headers);
  const queryString = Object.entries(paramsObject)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
  const maybeQueryString = queryString.length > 0 ? `?${queryString}` : "";
  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow",
  };
  return fetchJson<TResponse>(`${url}${maybeQueryString}`, requestOptions);
}

function apiPut<TResponse, TRequest>(
  url: string,
  request: TRequest,
  headers: Headers
) {
  updateHeaders(headers);

  var raw = JSON.stringify(request);

  var requestOptions = {
    method: "PUT",
    headers,
    body: raw,
    redirect: "follow",
  };

  return fetchJson<TResponse>(url, requestOptions as any);
}

function apiDelete<TResponse>(
  url: string,
  headers: Headers,
  paramsObject: ParamsObject = {}
) {
  updateHeaders(headers);
  const queryString = Object.entries(paramsObject)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
  const maybeQueryString = queryString.length > 0 ? `?${queryString}` : "";

  var requestOptions = {
    method: "DELETE",
    headers,
    redirect: "follow",
  };
  return fetchJson<TResponse>(`${url}${maybeQueryString}`, requestOptions);
}
// ARCHITECTURE END

export const API_ROUTES = { 
	postAuthLogin: "/api/Auth/login",
	postAuthSsoLogin: "/api/Auth/sso-login",
	postCacheClear: "/api/Cache/Clear",
	getCategoriesList: "/api/Categories/list",
	getHome: "/api/home",
	postLogError: "/api/Log/Error",
	deleteOrdersId: "/api/Orders",
	postOrders: "/api/Orders",
	postOrdersList: "/api/Orders/list",
	getProductsId: "/api/Products",
	deleteProductsId: "/api/Products",
	getProductsList: "/api/Products/list",
	postProductsSearch: "/api/Products/search",
	postProducts: "/api/Products",
	putProducts: "/api/Products",
	postResourcesResources: "/api/Resources/Resources",
	postResourcesCreate: "/api/Resources/Create",
	getSecuritySwitchUser: "/api/Security/switch-user",
	getUsersList: "/api/Users/list",
	getUsersId: "/api/Users",
	deleteUsersId: "/api/Users",
	putUsers: "/api/Users"
}

export interface AuthRequest {
	login: string;
	password: string;
}

export enum Role {
	User = "User",
	Admin = "Admin"
}

export enum AuthError {
	GoogleAuth = "GoogleAuth",
	ApplicationVerification = "ApplicationVerification",
	UserNotFound = "UserNotFound"
}


export interface AuthResult {
	isSuccessful: boolean;
	kind: string;
	localId: string;
	email: string;
	displayName: string;
	idToken: string;
	registered: boolean;
	error: AuthError;
 	errorMessage: string;
}

export interface ProblemDetails {
	type: string;
	title: string;
	status?: number;
	detail: string;
	instance: string;
	extensions?: unknown;
}

export enum UserOriginDto {
	Google = "Google"
}

export interface SsoAuthRequest {
	email: string;
	token: string;
	userOrigin: UserOriginDto;
}

export interface CategoryDTO {
	categoryID: any;
	name: string;
}

export interface WebLogRequest {
	dateCreated: string;
	error: string;
	additionalInfo: string;
	reduxState: string;
}

export interface WebLogRequestBatch {
	dateCreated: string;
	webLogRequests?: WebLogRequest[];
}

export interface ValidationMessage {
	field: string;
	message: string;
}

export interface BooleanResult {
	data: boolean;
	isValid: boolean;
	validationErrors?: ValidationMessage[];
}

export interface OrderDTO {
	orderId?: any;
	dateCreated?: string | null;
	name: string;
	price: number;
	userId?: number;
	productId: any;
}

export interface GetOrderListQuery {
	allOrders: boolean;
	userID?: number;
	dateFrom?: string | null;
	dateTo?: string | null;
}

export interface ProductDto {
	productID: any;
	createdBy: number;
	updatedBy: number;
	isDeleted: boolean;
	name: string;
	price: number;
	quantity: number;
	imageURL: string;
	image: any;
	discountPrice?: number;
	isNew?: boolean;
	categoryID?: number;
}

export interface Result {
	isValid: boolean;
	validationErrors?: ValidationMessage[];
}

export interface ProductSearchFilter {
	name: string | null; 
	filter?: any | null;
}

export interface ResourceFilter {
	languageCode: string;
}

export interface ResourceDto {
	resourceCode: string;
	languageCode: string;
	value: string;
}

export interface UserDto {
	userID: number;
	login: string;
	firstName: string;
	lastName: string;
	role: Role;
}

export interface UserUpdateRequest {
	userID: number;
	firstName: string;
	lastName: string;
}

const API_URL = process.env.REACT_APP_API_URL;
const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

export const postAuthLogin = (requestContract: AuthRequest, headers = new Headers()): 
	Promise<FetchResponse<AuthResult>> => {
	console.log(requestContract);
	let apikey = process.env.REACT_APP_FIREBASE_KEY;
	let query = {
		email: requestContract.login,
		password: requestContract.password
	}
	let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`
	return apiPost(url, query, headers);
}

export const postAuthSignUp = (requestContract: AuthRequest, headers = new Headers()):
	Promise<FetchResponse<AuthResult>> => {
	let apikey = process.env.REACT_APP_FIREBASE_KEY;
	let query = {
		email: requestContract.login,
		password: requestContract.password
	}
	let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`
	return apiPost(url, query, headers);
}

export const postAuthSsoLogin = (requestContract: SsoAuthRequest, headers = new Headers()): 
	Promise<FetchResponse<AuthResult>> => 
	apiPost(`${API_URL}/api/Auth/sso-login`, requestContract, headers);

export const postCacheClear = (headers = new Headers()): 
	Promise<FetchResponse<any>> => 
	apiPost(`${API_URL}/api/Cache/Clear`, {}, headers);

export const getCategoriesList = (headers = new Headers()): 
	Promise<FetchResponse<CategoryDTO[]>> => {
		let url = `${FIREBASE_URL}/categories.json`
		return apiGet(url, headers, {});
}

export const getHome = (headers = new Headers()): 
	Promise<FetchResponse<any>> => {
	return apiGet(`${API_URL}/api/home`, headers, {});
}

export const postLogError = (requestContract: WebLogRequestBatch, headers = new Headers()): 
	Promise<FetchResponse<any>> => 
	apiPost(`${API_URL}/api/Log/Error`, requestContract, headers);

export const deleteOrdersId = (id: any, headers = new Headers()): 
	Promise<FetchResponse<BooleanResult>> => {
		const userID = localStorage.getItem("jwtToken");
		let url = `${FIREBASE_URL}/orders/${userID}/${id}.json`

		return apiDelete(url, headers, {});
}

export const postOrders = (requestContract: OrderDTO, headers = new Headers()): 
	Promise<FetchResponse<OrderDTO>> =>
	{
		const userID = localStorage.getItem("jwtToken");
		let url = `${FIREBASE_URL}/orders/${userID}.json`
		return apiPost(url, requestContract, headers);
	}

export const postOrdersList = (requestContract: GetOrderListQuery, headers = new Headers()): 
	Promise<FetchResponse<OrderDTO[]>> => {
		let url = '';
		const userID = localStorage.getItem("jwtToken");

		if (!requestContract.allOrders) {
			url = `${FIREBASE_URL}/orders/${userID}.json`
		} else {
			url = `${FIREBASE_URL}/orders.json`
		}
		return apiGet(url, headers, {});
	}

export const getProductsId = (id: number, headers = new Headers()): 
	Promise<FetchResponse<ProductDto>> => {
	return apiGet(`${API_URL}/api/Products/${id}`, headers, {});
}

export const deleteProductsId = (id: any, headers = new Headers()): 
	Promise<FetchResponse<Result>> => {
	let url = `${FIREBASE_URL}/products/${id}.json`
	return apiDelete(url, headers, {});
}

export const getProductsList = (headers = new Headers()): 
	Promise<FetchResponse<ProductDto[]>> => {
	let url = `${FIREBASE_URL}/products.json`
	return apiGet(url, headers, {});
}

export const postProductsSearch = (requestContract: ProductSearchFilter, headers = new Headers()): 
	Promise<FetchResponse<ProductDto[]>> => 
	{
		let url = '';
		if (requestContract.filter == null) {
			url = `${FIREBASE_URL}/products.json?orderBy="name"&startAt="${requestContract.name}"&endAt="${requestContract.name}\uf8ff"`
		} else {
			console.log(requestContract.filter);
			url = `${FIREBASE_URL}/products.json?orderBy="categoryID"&startAt="${requestContract.filter}"&endAt="${requestContract.filter}\uf8ff"`
		}
		
		return apiGet(url, headers, {});
	}

export const postProducts = (requestContract: any, headers = new Headers()): 
	Promise<FetchResponse<ProductDto>> => 
	{
		let url = `${FIREBASE_URL}/products.json`
		return apiPost(url, requestContract, headers);
	}

export const putProducts = (requestContract: any, headers = new Headers()): 
	Promise<FetchResponse<ProductDto>> => 
	{
		let productID = requestContract.productID;
		let url = `${FIREBASE_URL}/products/${productID}.json`
		return apiPut(url, requestContract, headers);
	}

export const postResourcesResources = (requestContract: ResourceFilter, headers = new Headers()): 
	Promise<FetchResponse<any>> => 
	apiPost(`${API_URL}/api/Resources/Resources`, requestContract, headers);

export const postResourcesCreate = (requestContract: ResourceDto, headers = new Headers()): 
	Promise<FetchResponse<any>> => 
	apiPost(`${API_URL}/api/Resources/Create`, requestContract, headers);

export const getSecuritySwitchUser = (userID: number, headers = new Headers()): 
	Promise<FetchResponse<any>> => {
	const queryParams = {
		userID
	}
	return apiGet(`${API_URL}/api/Security/switch-user`, headers, queryParams);
}

export const getUsersList = (headers = new Headers()): 
	Promise<FetchResponse<UserDto[]>> => {
	return apiGet(`${API_URL}/api/Users/list`, headers, {});
}

export const getUsersId = (id: number, headers = new Headers()): 
	Promise<FetchResponse<UserDto>> => {
	return apiGet(`${API_URL}/api/Users/${id}`, headers, {});
}

export const deleteUsersId = (id: number, headers = new Headers()): 
	Promise<FetchResponse<Result>> => {
	return apiDelete(`${API_URL}/api/Users/${id}`, headers, {});
}

export const putUsers = (requestContract: UserUpdateRequest, headers = new Headers()): 
	Promise<FetchResponse<UserDto>> => 
	apiPut(`${API_URL}/api/Users`, requestContract, headers);

export const API = { 
	postAuthLogin,
	postAuthSsoLogin,
	postCacheClear,
	getCategoriesList,
	getHome,
	postLogError,
	deleteOrdersId,
	postOrders,
	postOrdersList,
	getProductsId,
	deleteProductsId,
	getProductsList,
	postProductsSearch,
	postProducts,
	putProducts,
	postResourcesResources,
	postResourcesCreate,
	getSecuritySwitchUser,
	getUsersList,
	getUsersId,
	deleteUsersId,
	putUsers
}


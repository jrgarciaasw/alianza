import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    public encodeURI(uri: string): string {
        return encodeURIComponent(uri);
    }
    
    private getOptions(
        contentType?: string, isSecure?: boolean, responseType?: ResponseType,
        aditionalHeaders?: {name: string, value: string}[]) {
        let headers: HttpHeaders = new HttpHeaders();
        if (contentType) {
            headers = headers.append('Content-Type', contentType);
        }
        if (aditionalHeaders) {
            aditionalHeaders.forEach(aditionalHeader => {
                headers = headers.append(aditionalHeader.name, aditionalHeader.value);
            });
        }

        const options: any = { };
        
        if (responseType) {
            options.responseType = responseType;
        } else {
            options.responseType = ResponseType.Json;
        }

        return options;
    }

    /**
     * Metodo utilizado para consumir un servicio por el metodo GET
     * @param url url para consumo
     * @param isSecure indica si el consumo requiere la información de la sesión
     * @param responseType indica si el tipo de respuesta esperado los valores posibles se encuentran ResponseType por defecto es Json
     * @param contentType indica si el tipo de contenido enviado en la petición por defecto es application/json
     */
    get(url, isSecure: boolean, responseType?: ResponseType, contentType?: string) {
        const options = this.getOptions(contentType, isSecure, responseType);
        return this.http.get(url, options);
    }

    /**
     * Metodo utilizado para consumir un servicio por el metodo POST
     * @param url url para consumo
     * @param body cuerpo de la petición
     * @param isSecure indica si el consumo requiere la información de la sesión
     * @param contentType indica el tipo de contenido que se enviara en el cuerpo de la petición por defecto corresponde a application/json
     * @param responseType indica si el tipo de respuesta esperado los valores posibles se encuentran ResponseType por defecto es Json
     */
    post(url, body: any, isSecure: boolean, contentType?: string, responseType?: ResponseType,
         aditionalHeaders?: {name: string, value: string}[]) {
        const options = this.getOptions(body ? (contentType || 'application/json') : undefined, isSecure, responseType, aditionalHeaders);
        return this.http.post(url, body, options);
    }

    /**
     * Metodo utilizado para consumir un servicio por el metodo PUT
     * @param url url para consumo
     * @param body cuerpo de la petición
     * @param isSecure indica si el consumo requiere la información de la sesión
     * @param contentType indica el tipo de contenido que se enviara en el cuerpo de la petición por defecto corresponde a application/json
     * @param responseType indica si el tipo de respuesta esperado los valores posibles se encuentran ResponseType por defecto es Json
     */
    put(url, body: any, isSecure: boolean, contentType?: string, responseType?: ResponseType) {
        const options = this.getOptions(body ? (contentType ? contentType : 'application/json') : undefined, isSecure, responseType);
        return this.http.put(url, body, options);
    }

    /**
     * Metodo utilizado para consumir un servicio por el metodo DELETE
     * @param url url para consumo
     * @param body cuerpo de la petición
     * @param isSecure indica si el consumo requiere la información de la sesión
     * @param contentType indica el tipo de contenido que se enviara en el cuerpo de la petición por defecto corresponde a application/json
     * @param responseType indica si el tipo de respuesta esperado los valores posibles se encuentran ResponseType por defecto es Json
     */
    delete(url, isSecure: boolean, contentType?: string, responseType?: ResponseType) {
        const options = this.getOptions(contentType, isSecure, responseType);
        return this.http.delete(url, options);
    }
    
}

export enum ResponseType {
    Json = 'json', Text = 'text', ArrayBuffer = 'arraybuffer', Blob = 'blob'
}

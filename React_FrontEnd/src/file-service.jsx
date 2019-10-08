import service from './Service.jsx';

export class FileService {
    uploadFileToServer(data){
        //returns Promise object
        return service.getRestClient().post("/Foto", data);
    }
}

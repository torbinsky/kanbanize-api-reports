import * as rm from 'typed-rest-client/RestClient';

export class KanbanizeApi {
    private apiKey: string;
    private restc: rm.RestClient;
    constructor(apiKey: string, subdomain: string){
        this.apiKey = apiKey;
        let baseUrl = `https://${subdomain}.kanbanize.com/index.php/api/kanbanize/`;
        this.restc = new rm.RestClient('kanbanize-api-client', baseUrl);
    }

    public async getAllTasks(boardId: string, params?: GetAllTasksRequest){
        let fn = `/get_all_tasks/boardid/${boardId}/format/json`;
        return await this.restc.get<GetAllTasksResponse[]>(fn, {
            additionalHeaders: {
                'apikey': this.apiKey
            }
        });
    }
}

export interface GetAllTasksResponse {
    taskid: string;
    position: number;
    type: string;
    assignee: string;
    title: string;
    description: string;
    subtasks: number;
    subtaskscomplete: number;
    color: string;
    priority: string;
    size: number;
    deadline: string;
    deadlineoriginalformat: string;
    extlink: string;
    tags: string;
    columnid: string;
    laneid: number;
    leadtime: number;
    blocked: number;
    blockedreason: string;
    subtaskdetails: SubTaskDetails[];
    links: Links;
    customfields: string[];
}

export interface Links {
    child: number;
    mirror: number;
    parent: number;
    related: number;
    predecessor: number;
    successor: number;
}

export interface SubTaskDetails {
    subtaskid: string;
    completiondate: string;
    assignee: string;
    title: string;
}

export interface GetAllTasksRequest {
    subtasks?: YesArg;
    comments?: YesArg;
    container?: YesArg;
    fromdate?: string;
    todate?: string;
    version?: string;
    page?: number;
    textformat?: TextFormatArg;
}

export type YesArg = "yes";
export type TextFormatArg = "plain" | "html";


const ka = new KanbanizeApi('APIKEY','saasquatch');
ka.getAllTasks('16').then( (response) => {
    response.result.forEach(task => {
        console.log(task);
    });
});
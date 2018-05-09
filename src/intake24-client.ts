import axios from 'axios';

export default class Intake24Client {

  //private accessToken?: string = undefined;
  private slashRegex = new RegExp("\\/\\/+", "g")

  constructor(private readonly apiBaseUrl: string, private readonly refreshToken: string) {
  }

  private getEndpointUrl(endpoint: string): string {
    return (this.apiBaseUrl + endpoint).replace(this.slashRegex, "/")
  }

  refreshAccessToken(): Promise<string> {
    return axios.post(this.getEndpointUrl("/refresh"), null, {headers: {"X-Auth-Token": this.refreshToken}}).then(
        response => response.data.accessToken as string
    )
  }

  getSurveySubmissions(surveyId: string): Promise<any> {
    return this.refreshAccessToken().then(accessToken => {
      let from = new Date(2000, 0, 1);
      let to = new Date();
      return axios.get(this.getEndpointUrl("/surveys/" + surveyId + "/submissions?dateFrom=" + from.toISOString() + "&dateTo=" + to.toISOString() + "&offset=0&limit=10000"), {headers: {"X-Auth-Token": accessToken}})
          .then(response => response.data)
    })
  }
}
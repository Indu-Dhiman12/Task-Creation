
export interface Res {
    success: boolean;
    status: number;
    resent: boolean;
    resend: Function;
    [key: string]: any;
}


class API {
    static async get(
        path: string | string[],
        resent: boolean = false
    ): Promise<Res> {
        return new Promise(async (resolve) => {
            try {
                if (Array.isArray(path)) path = path.join("/");
                let headers = new Headers();
                headers.append("Accept", "application/json");
                headers.append("Content-Type", "application/json");

                const accessToken = localStorage.getItem("token");

                if (accessToken) {
                    headers.append("Authorization", `Bearer ${accessToken}`);
                }

                let options: any = {
                    headers: headers,
                    method: "GET",
                    credentials: "include",
                };

                const response = await fetch("https://tak-cration-backend.onrender.com/" + path, options);
                console.log(path, "path");
                if (response.ok) {
                    const responseData = await response.json();
                    resolve(responseData);
                } else {
                    console.error('Request failed:', response.statusText);
                    // resolve(null); // or handle the error as needed
                }
            } catch (error) {
                console.error('Error during GET request:', error);
                // resolve(null); // or handle the error as needed
            }
        });
    }

    static async post(path: string | string[], body: any, resent: boolean = false): Promise<Res> {
        try {
            if (Array.isArray(path)) path = path.join("/");

            const headers = new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });

            const accessToken = localStorage.getItem("token");

            if (accessToken) {
                headers.append("Authorization", `Bearer ${accessToken}`);
            }

            const response = await fetch(`https://tak-cration-backend.onrender.com/${path}`, {
                method: "POST",
                credentials: "include",
                headers: headers,
                body: JSON.stringify(body),
            });

            const responseData: Res = await response.json();
            return responseData
        } catch (error) {
            console.error('Error during POST request:', error);
            throw error; // Rethrow the error for the caller to handle if needed
        }
    }

    static async postFile(
        path: string | string[],
        body: any,
        resent: boolean = false
    ): Promise<Res> {
        return new Promise(async (resolve) => {
            if (Array.isArray(path)) path = path.join("/");

            let headers = new Headers();
            let accessToken = localStorage.getItem("token")

            if (accessToken) {
                headers.append("Authorization", `Bearer ${accessToken}`);
            } else if (localStorage.getItem("token")) {
                headers.append(
                    "Authorization",
                    `Bearer ${localStorage.getItem("token")}`
                );
            }

            await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
                method: "POST",
                credentials: "include",
                headers: headers,
                body: body,
            })
                .then(async (res: Response) => {
                    let parsed = await this.parseRes(
                        res,
                        () => this.post(path, body, true),
                        resent,
                        path
                    );
                })
                .catch((err: any) => {
                    if (err.status == undefined) {
                    }
                    console.error(err);
                });
        });
    }

    static async put(
        path: string | string[],
        body: any,
        resent: boolean = false
    ): Promise<Res> {
        return new Promise(async (resolve) => {
            if (Array.isArray(path)) path = path.join("/");

            let headers = new Headers();
            let accessToken = localStorage.getItem("token")

            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            if (accessToken) {
                headers.append("Authorization", `Bearer ${accessToken}`);
            } else if (localStorage.getItem("token")) {
                headers.append(
                    "Authorization",
                    `Bearer ${localStorage.getItem("token")}`
                );
            }

            await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
                method: "PUT",
                credentials: "include",
                headers: headers,
                body: JSON.stringify(body),
            })
                .then(async (res: Response) => {
                    let parsed = await this.parseRes(
                        res,
                        () => this.post(path, body, true),
                        resent,
                        path
                    );

                    // if (Process.isDev) console.log("PUT", path, "\n", parsed);

                })
                .catch((err: any) => {
                    if (err.status == undefined) {
                        // Route.load("/maintenance");
                    }
                    console.error(err);
                });
        });
    }

    static async delete(
        path: string | string[],
        body: any,
        resent: boolean = false
    ): Promise<Res> {
        return new Promise(async (resolve) => {
            // Join path array
            if (Array.isArray(path)) path = path.join("/");

            let headers = new Headers();
            let accessToken = localStorage.getItem("token")

            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            if (accessToken) {
                headers.append("Authorization", `Bearer ${accessToken}`);
            } else if (localStorage.getItem("token")) {
                headers.append(
                    "Authorization",
                    `Bearer ${localStorage.getItem("token")}`
                );
            }

            await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
                method: "DELETE",
                credentials: "include",
                headers: headers,
                body: JSON.stringify(body),
            })
                .then(async (res: Response) => {
                    let parsed = await this.parseRes(
                        res,
                        () => this.post(path, body, true),
                        resent,
                        path
                    );

                })
                .catch((err: any) => {
                    if (err.status == undefined) {
                    }
                    console.error(err);
                });
        });
    }

    static async parseRes(
        raw: Response,
        resend: Function,
        resent: boolean,
        path: string | string[]
    ) {
        let res: Res = await raw?.json();
        res.success = raw.status >= 200 && raw.status < 300;
        res.status = raw.status;
        res.resend = resend;
        res.resent = resent;

        if (!res.success) {
            return res;
        }
    }
}

export default API;

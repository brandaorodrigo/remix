const fetchJson = async <T>(input: string, init?: RequestInit): Promise<T> => {
    const url = new URL(input);
    return fetch(url.href, init).then(async (response) => {
        const json = parseJson(await response.text()) as any;
        if (response.status < 200 || response.status >= 300)
            throw { message: json?.message, status: response.status };
        return json as T;
    });
};

const formDataToJson = (data: FormData) => {
    const keys = [...new Set(Array.from(data.keys()))];
    const object = Object.fromEntries(
        keys.map((key) => [
            key,
            data.getAll(key).length > 1 ? data.getAll(key) : data.get(key),
        ])
    );
    return JSON.parse(JSON.stringify(object));
};

const parseJson = (text: string | null, normal: any = {}): any => {
    try {
        return text ? JSON.parse(text) : normal;
    } catch (error) {
        return normal;
    }
};

export { fetchJson, formDataToJson, parseJson };

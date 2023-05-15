import { css } from '@emotion/css';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

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

export const loader = async () => {
    const data = {
        game: 'The Legend Of Zelda',
        title: 'Tears Of The Kingdom',
    };
    return json(data);
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const data = formDataToJson(formData);
    return json(data);
};

export default function Component() {
    const loaderData = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    return (
        <div
            className={css`
                label {
                    display: block;
                    font-size: 12px;
                    color: #888;
                    margin: 0 0 20px 0;

                    input {
                        display: block;
                    }
                }
            `}
        >
            <Form action="/nested/internal" method="post">
                <p>{JSON.stringify(actionData)}</p>
                <p>{JSON.stringify(loaderData)}</p>
                <label>
                    Game
                    <input
                        defaultValue={loaderData.game}
                        name="game"
                        type="text"
                    />
                </label>
                <label>
                    Title
                    <input
                        defaultValue={loaderData.title}
                        name="title"
                        type="text"
                    />
                </label>
                <label>
                    Cover
                    <input name="cover" type="file" />
                </label>
                <label>
                    <button type="submit">Submit</button>
                </label>
            </Form>
        </div>
    );
}

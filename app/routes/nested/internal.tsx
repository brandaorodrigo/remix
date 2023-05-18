import { css } from '@emotion/css';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from '@remix-run/react';

import { fetchJson, formDataToJson } from '~/utils/javascript';

export const loader = async () => {
    const response = await fetchJson(
        'https://mospromo.spotmetrics.com/v1/CDLRMAES/api/pwa/config'
    );
    return json(response);
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const data = formDataToJson(formData);
    return json(data);
};

export default function Component() {
    const loaderData = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    const { state } = useNavigation();

    /*
    if (state === 'loading') {
        return <div>Loading</div>;
    }

    if (state === 'submitting') {
        return <div>Submitting</div>;
    }
    */

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
                    <button disabled={state !== 'idle'} type="submit">
                        Submit
                    </button>
                </label>
            </Form>
        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <>
            <h1>Error</h1>
            <pre>{error.message}</pre>
        </>
    );
}

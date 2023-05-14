import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';

export const loader = async () => {
    return json({ name: 'Zelda' });
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const obj = Object.fromEntries(
        Array.from(formData.keys()).map((key) => [
            key,
            formData.getAll(key).length > 1
                ? formData.getAll(key)
                : formData.get(key),
        ])
    );
    console.log(obj);
    return json(obj);
};

export default function MyForm() {
    const loader = useLoaderData();
    const action = useActionData();

    return (
        <Form method="post">
            <p>{JSON.stringify(action)}</p>
            <input
                defaultValue={loader.name}
                id="name"
                name="name"
                title="Name"
            />
            <button type="submit">Submit Form</button>
        </Form>
    );
}

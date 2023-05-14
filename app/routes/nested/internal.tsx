import React, { useRef, useState } from 'react';

import type { ActionArgs } from '@remix-run/node'; // or cloudflare/deno
import { json, redirect } from '@remix-run/node'; // or cloudflare/deno
import { Form, useActionData, useSubmit } from '@remix-run/react';
import { Form as Form1, Input } from 'antd';

const debug = async () => {
    console.log('aaa');
};

export async function action({ request }: ActionArgs) {
    await debug();
    const form = await request.formData();

    //alert(form.get("email"));

    const email = form.get('email');
    const password = form.get('password');
    const errors = {} as any;

    // validate the fields
    if (typeof email !== 'string' || !email.includes('@')) {
        errors.email = "That doesn't look like an email address in " + email;
    }

    if (typeof password !== 'string' || password.length < 6) {
        errors.password = 'Password must be > 6 characters';
    }

    // return data if we have errors
    if (Object.keys(errors).length) {
        return json(errors, { status: 422 });
    }

    // otherwise create the user and redirect
    //await createUser(form);
    return redirect('/nested');
}

export default function Signup() {
    const errors = useActionData<typeof action>();
    const submit = useSubmit();

    const [form] = Form1.useForm();

    return (
        <>
            <h1>Signup</h1>
            {JSON.stringify(errors)}
            <Form method="post" action="/nested/internal">
                <p>
                    <Form1.Item
                        name="email"
                        label="email"
                        rules={[{ required: true }]}
                    >
                        <Input name="email" />
                    </Form1.Item>
                    {errors?.email ? <span>{errors.email}</span> : null}
                </p>
                <p>
                    <input title="password" type="text" name="password" />
                    {errors?.password ? <span>{errors.password}</span> : null}
                </p>
                <p>
                    <button type="submit">Sign up</button>
                </p>
            </Form>
        </>
    );
}

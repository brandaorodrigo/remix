import type { FormEvent, Ref } from 'react';
import React, { useRef, useState } from 'react';

import type { ActionArgs } from '@remix-run/node'; // or cloudflare/deno
import { json, redirect } from '@remix-run/node'; // or cloudflare/deno
import { Form, useActionData, useSubmit } from '@remix-run/react';
import type { FormInstance } from 'antd';
import { Button, Form as FormAntd, Input } from 'antd';

export async function action({ request }: ActionArgs) {
    const form = await request.formData();

    console.log(form.get('rod'));

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

    const [form] = FormAntd.useForm();

    return (
        <>
            {JSON.stringify(errors)}
            <h2>Antd</h2>
            <FormAntd
                // action="/nested/internal"
                form={form}
                id="aa"
                method="post"
                onFinish={() => {
                    submit(document.querySelector('#aa') as HTMLFormElement, {
                        replace: true,
                    });
                }}
            >
                <FormAntd.Item
                    label="rod"
                    name="rod"
                    required
                    rules={[{ required: true }]}
                >
                    <Input name="rod" title="rod" />
                </FormAntd.Item>
                <FormAntd.Item
                    label="surname"
                    name="surname"
                    required
                    rules={[{ required: true }]}
                >
                    <Input />
                </FormAntd.Item>
                <Button htmlType="submit">Submit</Button>
            </FormAntd>
        </>
    );
}

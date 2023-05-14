import React from 'react';

import { useSubmit } from '@remix-run/react';
import type { FormProps } from 'antd';
import { Form } from 'antd';

type RemixFormProps = Omit<FormProps, 'method' | 'id' | 'onFinish'> & {
    id: string;
};

const RemixForm: React.FC<RemixFormProps> = ({ id, children, ...props }) => {
    const submit = useSubmit();

    return (
        <Form
            id={id}
            method="post"
            onFinish={() => {
                submit(document.querySelector('#' + id) as HTMLFormElement, {
                    replace: true,
                });
            }}
            {...props}
        >
            {children as React.ReactNode}
        </Form>
    );
};

class FormRemix extends React.Component<RemixFormProps> {
    /*
    constructor(props: RemixFormProps) {
        super(props);
    }
    */
    static Item = Form.Item;
    static useForm = Form.useForm;
    render() {
        return <RemixForm {...this.props} />;
    }
}

export default FormRemix;

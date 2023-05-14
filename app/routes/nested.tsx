import type { V2_MetaFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const v2_meta: V2_MetaFunction = () => {
    return [{ title: 'New Remix App' }];
};

export default function Index() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            ROD
            <Outlet />
        </div>
    );
}

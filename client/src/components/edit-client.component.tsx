import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClientForm } from './client-form';
import { IClient } from '../interfaces/IClient.interface';
import { initialDataClean } from '../data/initialDataClean';

export const EditClient = (props: any) => {
 
    const [formValues, setFormValues] = useState( initialDataClean );

    const onSubmit = (clientObject: IClient) => {
        axios
            .put(
                'http://localhost:4000/clients/update-client/' +
                    props.match.params.id,
                clientObject,
            )
            .then((res) => {
                if (res.status === 200) {
                    alert('Client successfully updated');
                    props.history.push('/client-list');
                } else Promise.reject();
            })
            .catch((err) => alert('Something went wrong'));
    };

    useEffect(() => {
        axios
            .get(
                'http://localhost:4000/clients/update-client/' + 
                    props.match.params.id,
            )
            .then((res) => {
                const {
                    customer_id,
                    first_name,
                    last_name,
                    email,
                    gender,
                    country,
                    city,
                    street,
                    phone,
                    total_price,
                    currency,
                    cerdit_card_type,
                    cerdit_card_number,
                } = res.data;
                setFormValues({
                    customer_id,
                    first_name,
                    last_name,
                    email,
                    gender,
                    country,
                    city,
                    street,
                    phone,
                    total_price,
                    currency,
                    cerdit_card_type,
                    cerdit_card_number,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <ClientForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
                {console.log('formValues :>> ', formValues) }

            Update Client
        </ClientForm>
    );
};

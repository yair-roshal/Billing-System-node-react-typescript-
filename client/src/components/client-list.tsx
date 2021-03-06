import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ClientTableRow } from 'components';
import { dataNameTypes } from 'data';
import { IClientID } from 'interfaces';

export const ClientList = () => {
    const [clients, setClients] = useState<IClientID[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/clients/')
            .then(({ data }) => {
                setClients(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return clients.map((res: IClientID, index: number) => {
            return <ClientTableRow obj={res} key={index} />;
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {Object.keys(dataNameTypes).map(
                            (keyOfObj: string, index: number) => (
                                <TableCell key={index} align="center">
                                    {keyOfObj}
                                </TableCell>
                            ),
                        )}

                        <TableCell align="center">actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>{DataTable()}</TableBody>
            </Table>
        </TableContainer>
    );
};

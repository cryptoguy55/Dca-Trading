import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TablePagination from '@material-ui/core/TablePagination';
import Spinner from "components/spinner"
import "./style.scss"

const SortTableHead = (props) => {
    return (
        <div className="sort-icon">
            <ArrowDropUpIcon /><ArrowDropDownIcon className="sort-icon--down" />
        </div>
    );
}

const InvoiceTable = ({ data, isloading }) => {
    const [page, setPage] = useState(0);
    const [items, setItems] = useState(10)
    const [row, setRow] = useState([...data.slice(0, items)]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setItems( e => event.target.value)
    }
    useEffect(() => {
        setRow([...data.slice(page * items, (page + 1) * items)])
    }, [page, items]);

    return (
        <React.Fragment>
            <div className={`invoice--table ${data.length == 0 ? "" : "visible"}` }>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><span>Issuer Account<SortTableHead /></span></TableCell>
                            <TableCell><span>Issuer KYC<SortTableHead /></span></TableCell>
                            <TableCell><span>Accountname<SortTableHead /></span></TableCell>
                            <TableCell><span>Token Currency Code<SortTableHead /></span></TableCell>
                            <TableCell><span>Total issued value of this token<SortTableHead /></span></TableCell>
                            <TableCell><span>Number of TrustLines<SortTableHead /></span></TableCell>
                            <TableCell><span>Current Dex Offers<SortTableHead /></span></TableCell>
                            {/* <TableCell>Trustline</TableCell>
                            <TableCell>Dex</TableCell> */}
                            <TableCell>Explorers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.account}
                                </TableCell>
                                <TableCell>
                                    {row.kyc && <CheckCircleIcon style={{color: "green"}} />}
                                </TableCell>
                                <TableCell>
                                    {row.username}
                                </TableCell>
                                <TableCell>
                                    {row.currency}
                                </TableCell>
                                <TableCell>
                                    {row.amount}
                                </TableCell>
                                <TableCell>
                                    {row.trustlines}
                                </TableCell>
                                <TableCell>
                                    {row.offers}
                                </TableCell>
                                <TableCell>
                                    <a href={`https://bithomp.com/explorer/${row.account}`}>Bithomp</a>&nbsp;|&nbsp; 
                                    <a href={`https://xrpscan.com/account/${row.account}`}>XRPScan</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="invoice--table--pagination">
                    <TablePagination
                        labelRowsPerPage="Rows per page"
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={items}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* <span className="left-page">
                        page {page + 1} of {data.length % 5 == 0 ? (data.length == 0 ? 1 : Math.floor(data.length / 5)) : Math.floor(data.length / 5 + 1)}
                    </span> */}
                </div>
            </div>
            { isloading && <Spinner type={1} />}
        </React.Fragment>
        
    )
}

export default InvoiceTable;


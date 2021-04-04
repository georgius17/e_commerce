import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UserDto } from "Api/Api";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "State/Auth/AuthReducer";

type Props = {
  users: UserDto[];
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    cursor: "pointer",
  },
  button: {
    padding: "6px 16px",
    border: "1px solid orange",
    backgroundColor: "#00d5ff",
    color: "#fff",
    lineHeight: "2",
    minWidth: "120px",
    fontSize: "13px",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "#fff",
      color: "orange",
    },
  },
});

const UsersTable: React.FunctionComponent<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLogin = (user: any) => {
    const loginUser = {
      login: user.login,
      password: "null",
    };
    dispatch(loginUserAsync.request(loginUser));
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Uživatel</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Jméno</TableCell>
            <TableCell align="right">Příjmení</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map(user => (
            <TableRow key={user.userID}>
              <TableCell component="th" scope="row">
                {user.login}
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">
                {" "}
                <button
                  className={classes.button}
                  onClick={() => onLogin(user)}
                >
                  {" "}
                  Přihlásit se
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { UsersTable };

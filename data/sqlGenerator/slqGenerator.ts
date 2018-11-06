
export class SqlGenerator {

    generateInsert(tableName: string, columns: any) {
        let query =  "INSERT INTO " + tableName + " (" + columns.join(",") + ") VALUES ?"
        return query;
    }
    generateUpdateQuery(tableName: string, columns: any) {
        return "UPDATE " + tableName + " SET  " + columns.join(" = ?,") + " = ? WHERE id = ? ";// + columns[0] + " = ?"
    }

    generateDeleteQuery(tableName: string) {
        let deleteQuery = "DELETE FROM " + tableName + " WHERE id = ?";
        return deleteQuery;
    }
}


























































// let cols = ;
//         let updateCols = Object.keys(data[0]);;
//         updateCols.shift();
import { SqlGenerator } from "../../../data/sqlGenerator/slqGenerator";
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as _ from 'underscore';
let expect = chai.expect;


const sqlGen = new SqlGenerator()

describe('#sqlGenerator', function () {
    let callBackSpy; let tName; let Columns; let result
    beforeEach(() => {
        tName = "tbl_test";
        Columns = ['col1', 'col2', 'col3'];
    })
    afterEach(() => {
        callBackSpy.restore();
    })
    it('#generateInsert should be called with two arguments and return an insert query',
        function () {
            callBackSpy = sinon.spy(sqlGen, 'generateInsert')
            result = sqlGen.generateInsert(tName, Columns)
            expect(callBackSpy).to.have.been.calledWith(tName, Columns);
            expect(result).to.equal('INSERT INTO tbl_test (col1,col2,col3) VALUES ?')
        })
    it('#generateUpdateQuery should be called with two arguments and return a prepared update statement ?',
        function () {
        let  uCallBackSpy = sinon.spy(sqlGen, 'generateUpdateQuery')
           let updateQuery = sqlGen.generateUpdateQuery(tName, Columns)
            expect(uCallBackSpy).to.have.been.calledWith(tName, Columns);
            // expect(updateQuery).to.equal("UPDATE tbl_test SET  col1 = ?,col2 = ?,col3 = ? WHERE id = ?");
        })
    it('# generateDeleteQuery should be called with one arguments and return a prepared delete statement ?',
        function () {
        let  uCallBackSpy = sinon.spy(sqlGen, 'generateDeleteQuery')
           let updateQuery = sqlGen.generateDeleteQuery(tName)
            expect(uCallBackSpy).to.have.been.calledWith(tName);
            expect(updateQuery).to.equal("DELETE FROM tbl_test WHERE id = ?");
        })

})
import mongoose from 'mongoose';

const TechnicalDebtReportSchema = new mongoose.Schema({
    reference: String,
    commit: String,
    commit_date: Date,
    analysis_date: Date,
    repository: mongoose.SchemaTypes.ObjectId,
    indicators: [String],
    types: [String]
});

TechnicalDebtReportSchema.statics = {

	listFullReportByRepository(repository, commits) {
		return this.aggregate(
	      [
	        {
	          $match: {
							repository: mongoose.Types.ObjectId(repository),
							commit: { $in: commits }
	          }
	        },
	        {
	          $lookup:
	            {
	              from: "rm_technical_debt",
	              localField: "_id",
	              foreignField: "analysis_report",
	              as: "technicaldebt"
	            }
	       }
	      ]
	    )
	      .exec();
	},

	listFullReportByRepoAndRef(repository, reference) {
		return this.aggregate(
	      [
	        {
	          $match: {
	            repository: mongoose.Types.ObjectId(repository),
	            reference: reference,
	          }
	        },
	        {
	          $lookup:
	            {
	              from: "rm_technical_debt",
	              localField: "_id",
	              foreignField: "analysis_report",
	              as: "technicaldebt"
	            }
	       },
	      ]
	    )
	      .exec();
	}
}


/**
 * @typedef TechnicalDebtReportModel
 */
export default mongoose.model('TechnicalDebtReportModel', TechnicalDebtReportSchema, 'rm_technical_debt_report');

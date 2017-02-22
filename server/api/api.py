#!/usr/bin/env python
from flask import Flask
from flask_restplus import Resource, Api

from helper.statistics import calc_whisker
from helper.database import get_db
import pandas as pd
import random

app = Flask(__name__)
api = Api(app)


#endpoints
@api.route('/api/expression/<string:symbol>')
class expression(Resource):
	def get(self, symbol):
		conn = get_db()

		expression = pd.read_sql("SELECT e.celllinename, e.symbol, e.expression, a.site_primary as tissue FROM expression e JOIN annotation a ON e.annotation_id=a.id WHERE symbol = '{}'".format(symbol), conn)
		expression['sub_tissue'] = [random.choice(['normal','cancer']) for i in range(0,expression.shape[0])]

		max_expression = expression.expression.max()
		min_expression = expression.expression.min()

		expression = expression.groupby(['tissue','sub_tissue']).apply(calc_whisker).reset_index()
		
		expression.tissue = expression.tissue.str.replace('_',' ')
		
		tissues = sorted(expression.tissue.unique().tolist())
		sub_tissues = sorted(expression.sub_tissue.unique().tolist())

		expression = expression.to_dict(orient = 'records')
		
		return {'data':expression,'tissues':tissues,'sub_tissues': sub_tissues,'max_expression': max_expression, 'min_expression': min_expression} or ('Not found', 404)

if __name__ == "__main__":
	app.run(port=3001, debug = True)


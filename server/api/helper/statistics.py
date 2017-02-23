import pandas as pd

def calc_whisker(data):
	Q1, median, Q3 = pd.np.percentile(data.expression.tolist(), [25, 50, 75])
	IQR = Q3 - Q1

	loval = max(Q1 - 1.5 * IQR,0)
	hival = Q3 + 1.5 * IQR

	whiskhi = list(pd.np.compress(data.expression >= hival, data.expression))
	whisklo = list(pd.np.compress(data.expression <= loval, data.expression))
	
	return pd.Series({'open':Q1, 'close': Q3, 'median': median, 'high': hival, 'low': loval, 'high': hival, 'outliers': whiskhi+whisklo })

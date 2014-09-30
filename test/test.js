
/*
**细胞编号如下：
**A1 B1 A2
**B2 C  B3
**A3 B4 A4
 */

N = 3;
now = new Array(N*N);//棋盘上现在的状态，0-死细胞，1-活细胞
future = new Array(N*N);//棋盘将要变为的状态


function changeStatus(i, j){
	var result;
	live = now[(j-1+N)%N + i*N] + now[(j-1+N)%N + (i-1+N)%N*N] + now[j + (i-1+N)%N*N] + now[(j+1+N)%N + (i-1+N)%N*N] +
				   now[(j+1+N)%N + i*N] + now[(j+1+N)%N + (i+1+N)%N*N] + now[j + (i+1+N)%N*N] + now[(j-1+N)%N + (i+1+N)%N*N];
			if(live == 3) result = 1;
			else if (live == 2) result  = now[ i*N +j];
			else result = 0;
	return result;
}


function changeCell(){
	for(var i = 0; i < N; i++)
	{
		for(var j = 0; j < N; j++)
		{
			future[i*N + j] = changeStatus(i, j);
		}
	}
	return future;
}



test('test', function() {
	//所有细胞周围有1个活细胞的情况（A1除外）
	
	now = [1, 0, 0, 0, 0, 0, 0, 0, 0];
	deepEqual(changeCell(),[0,0,0,0,0,0,0,0,0],'one cell passed');

	//所有细胞周围有2个活细胞的情况（A1， A4除外）
	now = [1, 0, 0, 0, 0, 0, 0, 0, 1];
	deepEqual(changeCell(),[0,0,0,0,0,0,0,0,0],'two cell passed');

	//A1, A4细胞周围有2个活细胞的情况
	//所有细胞周围有3个活细胞的情况（A1，C, A4除外）
	now = [1, 0, 0, 0, 1, 0, 0, 0, 1];
	deepEqual(changeCell(),[1,1,1,1,1,1,1,1,1],'three cell passed');

	//A1, C, A4周围有3个活细胞的情况
	//所有细胞周围有4个活细胞的情况（A1， A2， A4， C）
	now = [1, 0, 1, 0, 1, 0, 0, 0, 1];
	deepEqual(changeCell(),[1, 0, 1, 0, 1, 0, 0, 0, 1],'four cell passed');

	//A1, A2，C, A4周围有4个活细胞的情况
	now = [1, 0, 1, 0, 1, 0, 1, 0, 1];
	deepEqual(changeCell(),[0, 0, 0, 0, 0, 0, 0, 0, 0],'four cell passed');

	});

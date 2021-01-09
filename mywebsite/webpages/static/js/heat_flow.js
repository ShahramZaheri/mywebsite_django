            
            
        function error_sum(new_matrix,old_matrix){
               var sum = 0;
                for (i=0;i<new_matrix.length;i++){
                    for (j=0; j<new_matrix[0].length;j++){
                        sum+=(new_matrix[i][j]-old_matrix[i][j])**2; 
                    }
                }
                return sum;
            }
            
            function make_board(row,column,boundary_condition,initial_condition,x_of_source,y_of_source,temp_of_source){
                var matrix=[];
                for (i=0;i<row;i++){
                    matrix.push([]);
                    for (j=0;j<column;j++){
                        matrix[i].push(initial_condition);
                    }
                }
    
                for (i=0;i<row;i=i+row-1){
                    for (j=0;j<column;j++){
                        matrix[i][j]=boundary_condition;
                    }
                }
                for (i=0;i<row;i++){
                    for(j=0;j<column;j=j+column-1){
                        matrix[i][j]=boundary_condition;
                    }
                }
            
                matrix[x_of_source][y_of_source]=temp_of_source;
                
                return matrix;
                 }
            
            
            
            
            function calculation(matrix,x_of_source,y_of_source){
                var output_matrix=make_board(matrix.length,matrix[0].length,matrix[0][0],0.5*(matrix[0][0]+matrix[x_of_source][y_of_source]),x_of_source,y_of_source,matrix[x_of_source][y_of_source]);
                for (i=1;i<x_of_source;i++){
                    for(j=1;j<matrix[0].length-1;j++){
                        output_matrix[i][j]=(matrix[i][j]+matrix[i-1][j]+matrix[i+1][j]+matrix[i][j-1]+matrix[i][j+1])/5;
                        }
                }
                for (i=x_of_source;i<x_of_source+1;i++){
                    for (j=1;j<y_of_source;j++){
                        output_matrix[i][j]=(matrix[i][j]+matrix[i-1][j]+matrix[i+1][j]+matrix[i][j-1]+matrix[i][j+1])/5;
                    }
                }
                for (i=x_of_source;i<x_of_source+1;i++){
                    for (j=y_of_source+1;j<matrix[0].length-1;j++){
                        output_matrix[i][j]=(matrix[i][j]+matrix[i-1][j]+matrix[i+1][j]+matrix[i][j-1]+matrix[i][j+1])/5;
                    }
                }
                for (i=x_of_source+1;i<matrix.length-1;i++){
                    for(j=1;j<matrix[0].length-1;j++){
                        output_matrix[i][j]=(matrix[i][j]+matrix[i-1][j]+matrix[i+1][j]+matrix[i][j-1]+matrix[i][j+1])/5;
                    }
                }
                return output_matrix;
            }
            
            
        function print_matrix(matrix,temp_of_border,temp_of_source){
            var red=0;
            var green=0;
            var blue=0;
            var my_print="<table cellpadding='10'> <th>";
            for (i=0;i<matrix.length;i++){
                my_print+="<td align='center'>"+String(i)+"</td>";
            }
            my_print+="</th>";
            for (i=0;i<matrix.length;i++){
                my_print+="<tr>"+"<td>"+String(i)+"</td>";
                for (j=0;j<matrix[i].length;j++){
                    red=255*(matrix[i][j]-Math.min(temp_of_border,temp_of_source))/(Math.abs(temp_of_border-temp_of_source));
                    blue=255*(Math.max(temp_of_border,temp_of_source)-matrix[i][j])/(Math.abs(temp_of_border-temp_of_source));
                    
                    my_print= my_print +  "<td style='background-color:rgb("+String(red)+","+String(green)+","+String(blue)+")'>" + (matrix[i][j]).toFixed(2)+"</td>";
                }
                my_print=my_print+"</tr>";
                
            }
            document.getElementById("heat_table").innerHTML=my_print;
        }
        
        
        function heat_flow(){
            var No_row = 10;
            var No_colum = 10;
            var border_temp = parseInt(document.getElementById("border_temp").value);
            var source_x = parseInt(document.getElementById("source_x").value);
            var source_y = parseInt(document.getElementById("source_y").value);
            var source_temp = parseInt(document.getElementById("source_temp").value);
            var error = 0.5;
            var initial_temp=(source_temp+border_temp)/2;
            var board=make_board(No_row,No_colum,border_temp,initial_temp,source_x,source_y,source_temp);
            while (error_sum(board,calculation(board,source_x,source_y))>error){
                
                setTimeout(print_matrix(board,border_temp,source_temp),7000);
                document.getElementById("error").innerHTML=error_sum(board,calculation(board,source_x,source_y));
                board=calculation(board,source_x,source_y);
            }
        }
            
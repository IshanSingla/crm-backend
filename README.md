# CRM Backend

<!-- write a program to calculate the sun 1-n  if n=5 return 1+2+3+4+5=15 -->
<!-- write a program to accept a numben from user and calculate its factorial -->
<!--  -->

```c
#include <stdio.h>

void first(){
    // write a program to calculate the sun 1-n if n=5 return 1+2+3+4+5=15 
    int n;
    int sum = 0;
    scanf("%d", &n);
    for(int i = 1; i <= n; i++){
        sum += i;
    }
    printf("%d\n",sum);
}

void second(){
    // write a program to accept a numben from user and calculate its factorial
    int n;
    int fact = 1;
    scanf("%d", &n);
    for(int i = 1; i <= n; i++){
        fact *= i;
    }
    printf("The factorial of %d is %d \n", n, fact);
}

int main(){
    first();
    second();
    return 0;
}
```

#include <stdio.h>
#include <stdlib.h>

int main (void)
{
    float  nota1, nota2, nota3, nota4, media;

    printf("Na hora de digitar as notas não use virgula, favor usar ponto!\n\n");

    printf("digite a primeira nota: ");
    scanf("%f", &nota1);

    printf("digite a segunda nota: ");
    scanf("%f", &nota2);

    printf("digite a terceira nota: ");
    scanf("%f", &nota3);

    printf("digite a quarta nota: ");
    scanf("%f", &nota4);

    media = ((nota1 + nota2 + nota3 + nota4) /2) *0.4;

    printf("Media das notas = %.1f\n", media);

    return 0;
}



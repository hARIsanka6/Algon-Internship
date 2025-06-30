#include<iostream>
using namespace std;

int main()
{  
    int num;

    cout<<"Enter the num :";
    cin>>num;
    for(int row =1;row<=num;row++){
        for(int col =1;col<=(num-row);col++){
            cout<<"  ";
        }
        for(int col =1;col<=row;col++){
            cout<<col<<" ";
        }
        for(int col =(row-1);col>=1;col--){
            cout<<col<<" ";
        }
        cout<<endl;
    }

    
    return 0;
}
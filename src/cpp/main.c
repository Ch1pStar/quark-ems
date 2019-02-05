#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

struct Node{
	int id;
	int x;
	int y;
};

int count = 0;
struct Node* nodes;

struct Node* get_nodes() {
	return &nodes[0];
}

int node_size() {
	return sizeof(struct Node);
}

int create_nodes(int c) {
	count = c;
	int byte_size = node_size()*count;

	nodes = malloc(byte_size);

	printf("Size: %d\n", byte_size);

	for (int i = 0; i < count; i++)
	{
		struct Node n;

		n.id = (i+1)*5;
		n.x = (1+i)*2;
		n.y = (1+i)*2;

		nodes[i] = n;
	}

	return count;
}

struct Node* tick(double delta) {

	for (int i = 0; i < count; i++)
	{
		if(i%2==0){
			nodes[i].x += (i+1);
		}else{
			nodes[i].y += (i+1);
		}
	}

	// return nodes location
	return &nodes[0];
}

int main(int argc, char const *argv[])
{

	return 0;
}
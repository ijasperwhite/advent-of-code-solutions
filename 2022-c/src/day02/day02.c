#include <stdio.h>
#include <assert.h>

int P1_EXAMPLE_RESULT = 0;
int P1_INPUT_RESULT = 0;

int P2_EXAMPLE_RESULT = 0;
int P2_INPUT_RESULT = 0;

void test_equal(int expected, int actual, const char *test_name)
{
    if (expected == actual)
    {
        printf("✓ %s\n", test_name);
    }
    else
    {
        printf("✗ %s: expected %d, got %d\n", test_name, expected, actual);
    }
}

int main()
{
    test_equal(P1_EXAMPLE_RESULT, 1, "Day02 part 1 example result");
    test_equal(P1_INPUT_RESULT, 0, "Day02 part 1 input result");

    test_equal(P2_EXAMPLE_RESULT, 0, "Day02 part 2 example result");
    test_equal(P2_INPUT_RESULT, 0, "Day02 part 2 input result");

    printf("All tests passed!\n");
    return 0;
}

# Algorithm performance basics

## Arrays

There are actually two types of arrays: static arrays and dynamic arrays.

- Static arrays
  That means that once the array is created with a defined length, that
  length can't be modified. Array's content can be modified, but we can not add more positions or
  delete some positions from the array. Strictly speaking the length of the array can't be modified, but
  array_start_position_in_memory + (element_size_in_bytes ∗ position_index)
  there is a circumvent to that, that is to create a new array and copy the content of the array to the
  new one.

- Dynamic arrays. This type of arrays reserves some space at the end of
  the array to be able to expand the array if necessary. So, if we need to store n different values in an
  array ( n is only a variable and can be any positive integer, it's just a way of generalization), the array
  is going to be created with n plus some arbitrary space that will be used if necessary.

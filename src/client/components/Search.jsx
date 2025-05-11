import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Popper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import products from '../data/products';

const WidePopper = styled(Popper)({
  width: 600,
  maxWidth: '100vw',
});

const Search = ({ onAddToCart, setSnackbarOpen, setSnackbarMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  // Debounce input
  useEffect(() => {
    if (!inputValue) {
      setFilteredProducts(products);
      setLoading(false);
      return;
    }

    setLoading(true);

    const terms = inputValue.toLowerCase().split(/\s+/).filter(Boolean);

    const filtered = products.filter((product) => {
      const match = terms.every((term) => {
        const matches =
          product.name.toLowerCase().includes(term) ||
          product.item_no.toLowerCase().includes(term) ||
          product.article_number.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term);

        return matches;
      });

      return match;
    });

    setFilteredProducts(filtered);

    setLoading(false);

  }, [inputValue]);

  const handleSelect = (event, newValue) => {
    if (newValue.assembly_price) {
      setSelectedProduct(newValue);
      setInputValue('');
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const qty = parseInt(quantity, 10);
    if (!selectedProduct) return;
  
    if (Number.isNaN(qty) || qty <= 0) {
      setQuantityError(true); // trigger error
      return;
    }
  
    // Valid quantity
    setQuantityError(false);
    onAddToCart({ ...selectedProduct, quantity: qty });
    setSelectedProduct(null);
    setQuantity('1');
    setSnackbarOpen(true);
    setSnackbarMessage(qty > 1 ? 'Items added to cart!' : 'Item added to cart!');
  };  

  const handleRemove = () => {
    setSelectedProduct(null); // Removes the selected product
    setQuantity(1);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >

        <Typography
          variant='h5'
          gutterBottom
        >
          Find your IKEA items:
        </Typography>

        <Autocomplete
          freeSolo
          sx={{ width: 357 }}
          value={null}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search by name or article number'
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                },
              }}
            />
          )}
          options={filteredProducts}
          getOptionLabel={(option) =>
            option?.display_name || option?.item_no || option?.description || ''
          }
          open={inputValue.length >= 2}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          onChange={handleSelect}
          disableClearable
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.item_no}
              style={{
                padding: 0,
                marginBottom: '5px', // Optional: Add some space between options
                border: '1px solid #ddd', // Border around each option
                borderRadius: '4px', // Optional: Rounded corners for the border
              }}
            >

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2,
                  py: 1.5,
                  width: 357,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  '&[data-focus="true"]': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >

                <img
                  src={option.image_link}
                  alt={option.display_name}
                  width='50'
                  height='50'
                  loading='lazy'
                  style={{ flexShrink: 0 }}
                />

                <Box sx={{ overflow: 'hidden' }}>

                  <Typography variant='body1' noWrap fontWeight={600}>
                    {option.name}
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{
                      color: '#333',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {option.description}
                  </Typography>

                  <Typography
                    variant='caption'
                    sx={{
                      color: '#666',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {option.article_number}
                  </Typography>

                </Box>

              </Box>

            </li>
          )}
          slotProps={{
            input: {
              endAdornment: (
                <>
                  {inputValue && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setInputValue('')}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )}
                  {/* This ensures the loading spinner or dropdown icon still shows */}
                  {params => params.InputProps?.endAdornment}
                </>
              ),
            },
          }}
          slots={{ popper: WidePopper }}
        />

        {loading && <CircularProgress />}

        {selectedProduct && (

          <Card
            sx={{
              width: 357,
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#ffffff',
            }}
          >

            <Stack direction='row' spacing={3} alignItems='center'>
              <img
                width='100'
                src={selectedProduct.image_link}
                alt={selectedProduct.display_name}
              />

              <Box>

                <Typography variant='subtitle1'>
                  {selectedProduct.name} - {selectedProduct.article_number}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  {selectedProduct.description}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  Assembly Price: $
                  {(selectedProduct.assembly_price_cents * 0.01).toFixed(2)}
                </Typography>

                <Stack direction='row' alignItems='center' spacing={2} mt={2}>

                <TextField
                  type="number"
                  label="Qty"
                  size="small"
                  value={quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setQuantity(val);
                      if (quantityError) setQuantityError(false); // clear error while typing
                    }
                  }}
                  error={quantityError}
                  helperText={quantityError ? 'Quantity must be greater than 0' : ''}
                  sx={{ width: 75 }}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: 1,
                      'aria-label': 'Quantity',
                    },
                  }}
                />

                <Typography>
                  Subtotal: $
                  {(
                    selectedProduct.assembly_price_cents *
                    0.01 *
                    (parseInt(quantity, 10) || 0)
                  ).toFixed(2)}
                </Typography>

                </Stack>

                <Box sx={{ display: 'flex', gap: 2 }}>

                  <Button
                    variant='contained'
                    size='large'
                    sx={{
                      mt: 2,
                      borderRadius: 5
                    }}
                    onClick={handleAddToCart}
                    disabled={quantity < 1}
                  >
                    Add to Cart
                  </Button>

                  <IconButton
                    onClick={handleRemove}
                    aria-label='remove product'
                    sx={{ mt: 2 }}
                  >
                    <DeleteIcon color='error' />
                  </IconButton>

                </Box>

              </Box>

            </Stack>

          </Card>

        )}

      </Box>

    </>
  );

};

export default Search;

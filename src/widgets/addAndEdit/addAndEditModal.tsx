import { useState } from 'react'

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { formatToUSDCurrency } from '@/shared/lib'

export function AddAndEditModal({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: string }) {
  const [displayValue, setDisplayValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required').max(15, 'Name must be 15 characters or less'),
    supplierEmail: Yup.string().email('Invalid email address'),
    count: Yup.number()
      .typeError('Count must be a number')
      .positive('Count must be greater than zero')
      .integer('Count must be an integer'),
    price: Yup.number().typeError('Price must be a number').positive('Price must be greater than zero'),
    cities: Yup.array()
      .of(Yup.string())
      .test('cities-check', 'You must select at least one city', function (value) {
        const { country } = this.parent
        if (country) {
          return Array.isArray(value) && value.length > 0
        }
        return true
      }),
  })

  const initialValues = {
    name: '',
    supplierEmail: '',
    count: '',
    price: '',
    country: '',
    cities: [],
    selection: '',
  }

  const countryOptions = ['usa', 'russia', 'france']
  const cityOptions = {
    usa: ['Los Angeles', 'Miami'],
    russia: ['Moscow', 'Sochi'],
    france: ['Paris', 'Nice'],
  }

  return (
    <Modal isCentered size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px) " />
      <ModalContent>
        <ModalCloseButton />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values)
          }}
          validateOnBlur={true}
          validateOnChange={false}>
          {({ values, handleChange, handleBlur, touched, errors, setFieldValue, setFieldError }) => (
            <Form autoComplete="off">
              <ModalBody mt={8} display="flex" flexDirection="column" gap={5}>
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <FormLabel htmlFor="name">Name:</FormLabel>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
                    <Input
                      maxW="250px"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={e => {
                        setFieldError('name', '')
                        handleChange(e)
                      }}
                      onBlur={e => {
                        handleBlur(e)
                      }}
                      type="text"
                    />
                    {touched.name && errors.name && <Text color="red.300">• {errors.name}</Text>}
                  </Box>
                </FormControl>

                <FormControl isInvalid={!!errors.supplierEmail && touched.supplierEmail}>
                  <FormLabel htmlFor="supplierEmail">Supplier email:</FormLabel>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
                    <Input
                      maxW="250px"
                      id="supplierEmail"
                      name="supplierEmail"
                      value={values.supplierEmail}
                      onChange={e => {
                        setFieldError('supplierEmail', '')
                        handleChange(e)
                      }}
                      onBlur={e => {
                        handleBlur(e)
                      }}
                      type="email"
                    />
                    {touched.supplierEmail && errors.supplierEmail && (
                      <Text color="red.300">• {errors.supplierEmail}</Text>
                    )}
                  </Box>
                </FormControl>

                <FormControl isInvalid={!!errors.count && touched.count}>
                  <FormLabel htmlFor="count">Count:</FormLabel>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
                    <Input
                      maxW="250px"
                      id="count"
                      name="count"
                      value={values.count}
                      onChange={e => {
                        setFieldError('count', '')
                        handleChange(e)
                      }}
                      onBlur={e => {
                        handleBlur(e)
                      }}
                      type="number"
                    />
                    {touched.count && errors.count && <Text color="red.300">• {errors.count}</Text>}
                  </Box>
                </FormControl>

                <FormControl isInvalid={!!errors.price && touched.price}>
                  <FormLabel htmlFor="price">Price:</FormLabel>
                  <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
                    <Input
                      maxW="250px"
                      id="price"
                      name="price"
                      value={displayValue}
                      onFocus={() => setDisplayValue(values.price)}
                      onChange={e => {
                        setFieldError('price', '')
                        setDisplayValue(e.target.value)
                        handleChange(e)
                      }}
                      onBlur={e => {
                        const numValue = Number(e.target.value)

                        if (!isNaN(numValue) && numValue > 0) {
                          const formattedValue = formatToUSDCurrency(numValue)
                          setFieldValue('price', numValue)
                          setDisplayValue(formattedValue)
                        }
                        handleBlur(e)
                      }}
                      type="text"
                    />
                    {touched.price && errors.price && <Text color="red.300">• {errors.price}</Text>}
                  </Box>
                </FormControl>

                <Box minH="170px">
                  <FormLabel htmlFor="selection">Delivery:</FormLabel>

                  <Box display="flex" gap={3} flexDirection="row">
                    <Box maxW="200px">
                      <Field
                        as={Select}
                        id="selection"
                        name="selection"
                        onChange={e => {
                          setFieldValue('selection', e.target.value)
                        }}>
                        <option value="">Select option</option>
                        <option value="country">Country</option>
                        <option disabled={!values.country} value="city">
                          City
                        </option>
                      </Field>
                    </Box>

                    {values.selection === 'country' && (
                      <Box p={2} minW="140px" border="1px" borderColor="gray.600" borderRadius="5px">
                        <RadioGroup
                          value={values.country}
                          name="country"
                          id="country"
                          onChange={e => {
                            setFieldValue('country', e)
                            setSelectedCountry(e)
                            setFieldValue('cities', [])
                          }}>
                          <Stack direction="column">
                            {countryOptions.map(country => (
                              <Radio key={country} value={country}>
                                {country}
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                      </Box>
                    )}

                    {values.selection === 'city' && selectedCountry && (
                      <Box p={2} minW="140px" border="1px" borderColor="gray.600" borderRadius="5px">
                        <Stack direction="column">
                          <Checkbox
                            name="selectAll"
                            isChecked={cityOptions[selectedCountry]?.length === values.cities?.length}
                            onChange={e => {
                              const checked = e.target.checked
                              const cities = checked ? cityOptions[selectedCountry] : []
                              setFieldValue('cities', cities)
                            }}>
                            Select all
                          </Checkbox>
                          <Divider orientation="horizontal" />
                          <Field
                            as={CheckboxGroup}
                            name="cities"
                            onChange={selectedCities => {
                              setFieldValue('cities', selectedCities)
                            }}>
                            {cityOptions[selectedCountry].map(city => (
                              <Checkbox key={city} value={city}>
                                {city}
                              </Checkbox>
                            ))}
                          </Field>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                  {errors.cities && <Text color="red.300">• {errors.cities}</Text>}
                </Box>
              </ModalBody>
              <ModalFooter justifyContent="start">
                <Button colorScheme="blue" mr={3} type="submit">
                  {type === 'add' ? 'Add' : 'Update'}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

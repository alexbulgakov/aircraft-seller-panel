import { useEffect, useState } from 'react'

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
import { useSelector } from 'react-redux'

import { useAppSelector } from '@/app/hooks'
import { AircraftType, validationSchema } from '@/entities/aircraft'
import { formatToUSDCurrency } from '@/shared/lib'

export function AddAndEditModal({
  isOpen,
  onClose,
  type,
  onSubmitFunc,
  id = 0,
}: {
  isOpen: boolean
  onClose: () => void
  type: string
  onSubmitFunc: (aircraft: AircraftType) => void
  id?: number
}) {
  const [displayValue, setDisplayValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const aircraft = useAppSelector(state => state.aircraft.data.find(aircraft => aircraft.id === id))

  const initialValues = aircraft
    ? {
        name: aircraft.name,
        supplierEmail: aircraft.supplierEmail,
        count: aircraft.count.toString(),
        price: aircraft.price.toString(),
        country: aircraft.delivery?.country || '',
        cities: aircraft.delivery?.city || [],
        selection: '',
      }
    : {
        name: '',
        supplierEmail: '',
        count: '',
        price: '',
        country: '',
        cities: [],
        selection: '',
      }

  useEffect(() => {
    if (aircraft?.name) {
      if (aircraft.price) {
        setDisplayValue(formatToUSDCurrency(aircraft.price))
      }
    }
  }, [aircraft])

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
            onSubmitFunc({
              id: type !== 'add' ? id : Date.now(),
              name: values.name,
              supplierEmail: values.supplierEmail,
              count: Number(values.count),
              price: Number(values.price),
              delivery: {
                country: values.country,
                city: values.cities,
              },
            })
            setDisplayValue('')
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

                <Box minH="180px">
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
                        <FormControl isInvalid={!!errors.cities && touched.cities}>
                          <Stack direction="column">
                            <Checkbox
                              name="selectAll"
                              isChecked={cityOptions[selectedCountry]?.length === values.cities?.length}
                              onChange={e => {
                                const checked = e.target.checked
                                const cities = checked ? cityOptions[selectedCountry] : []
                                setFieldValue('cities', cities)
                                if (checked) {
                                  setFieldError('cities', '')
                                } else {
                                  setFieldError('cities', 'You must select at least one city')
                                }
                              }}>
                              Select all
                            </Checkbox>
                            <Divider orientation="horizontal" />
                            <Field
                              as={CheckboxGroup}
                              name="cities"
                              onChange={selectedCities => {
                                if (selectedCities.length > 0) {
                                  setFieldError('cities', '')
                                } else {
                                  setFieldError('cities', 'You must select at least one city')
                                }
                                setFieldValue('cities', selectedCities)
                              }}>
                              {cityOptions[selectedCountry].map(city => (
                                <Checkbox key={city} value={city}>
                                  {city}
                                </Checkbox>
                              ))}
                            </Field>
                          </Stack>
                        </FormControl>
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

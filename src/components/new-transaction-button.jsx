import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import {
  BanknoteArrowDown,
  BanknoteArrowUpIcon,
  ChartNoAxesColumn,
} from 'lucide-react'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Form } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

import { useAuthContext } from '@/context/useAuthContext'
import { transactionsService } from '@/services'

import { Button } from './ui/button'
import { DatePickerSimple } from './ui/calendar-pick'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const ButtonTransaction = () => {
 const [open, setOpen] = useState(false)
  const {user} = useAuthContext()
 const queryClient = useQueryClient()

 const {mutate: newTransaction} = useMutation({
  mutationKey: ['createTransaction'],
  mutationFn: async (data) =>{
    await transactionsService.newTransaction(data)
    queryClient.invalidateQueries({queryKey: ['balance', user.id]})
  }, onSuccess: ()=>{
    toast.success('Transação feita com sucesso!')
  }
 })

  const schema = z.object({
    nameTransaction: z
      .string()
      .min(3, { error: 'A Descrição deve conter no mínimo 3 caracteres' }),
    valueTransaction: z.number({error: 'Insira um valor válido.'}),
    typeTransaction: z.enum(['EARNING', 'INVESTMENT', 'EXPENSE'], {
      error: 'Tipo de transação incorreta',
    }),
    dateTransaction: z.date({error:'Não é uma data válida'})
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nameTransaction: '',
      valueTransaction: '',
      typeTransaction: 'EARNING',
      dateTransaction: ''
    },
  })

  const HandleSubmit = async (data) => {
    newTransaction(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="submitButton" className="rounded-5">
          Nova transação <Plus />{' '}
        </Button>
      </DialogTrigger>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(HandleSubmit)} id='newTransaction'>
          <DialogContent className="flex flex-col gap-10">
            <DialogHeader>
              <DialogTitle className='text-3xl'>Nova transferência</DialogTitle>
            </DialogHeader>
            <FieldGroup className='grid grid-cols-2'>

              <Controller
                name="nameTransaction"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="nameTransaction">
                      Descrição da transação
                    </FieldLabel>
                    <Input
                      {...field}
                      id="nameTransaction"
                      placeholder="Descrição da transação"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="valueTransaction"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="valueTransaction">
                      Valor da transação
                    </FieldLabel>
                    <NumericFormat
                      {...field}
                      placeholder="Insira o valor"
                      decimalSeparator=","
                      thousandSeparator="."
                      prefix="R$"
                      allowNegative={false}
                      allowLeadingZeros={true}
                      customInput={Input}
                      onChange={()=>{}}
                      onValueChange={(values)=>{field.onChange(values.floatValue)}}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="typeTransaction"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="typeTransaction">
                      Tipo da transação
                    </FieldLabel>
                    <Select
                      id="typeTransaction"
                      onValueChange={(value) => {
                        field.onChange(value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Forma de transação"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INVESTMENT">
                          <div className="flex items-center gap-3">
                            {<ChartNoAxesColumn />} <p>Investimentos</p>
                          </div>
                        </SelectItem>
                        <SelectItem value="EARNING">
                          <div className="flex items-center gap-3">
                            {<BanknoteArrowUpIcon />} <p>Ganhos</p>
                          </div>
                        </SelectItem>
                        <SelectItem value="EXPENSE">
                          <div className="flex items-center gap-3">
                            {<BanknoteArrowDown />} <p>Gastos</p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="dateTransaction"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <DatePickerSimple {...field} id='dateTransaction' name="dateTransaction" label="Data do lançamento"/>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter className="grid grid-cols-2 gap-5" >
              <DialogClose asChild>
                <Button variant="destructive">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose asChild>
              <Button variant="submitButton" type="submit" form='newTransaction'>
                Enviar
              </Button>
                </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Form>
      </FormProvider>
    </Dialog>
  )
}

export default ButtonTransaction

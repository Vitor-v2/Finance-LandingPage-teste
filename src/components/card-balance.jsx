import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

const CardBalance = ({ data, title }) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle>
            {Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(data)}
          </CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  )
}

export default CardBalance

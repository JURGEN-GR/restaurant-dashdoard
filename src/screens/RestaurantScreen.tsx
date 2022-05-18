import { Button, Card, Container, Row, Spacer } from '@nextui-org/react';

export const RestaurantScreen = () => {
  return (
    <Container gap={4} fluid>
      <Card>
        <Row align="center">
          <Button
            iconRight={<i className="fa-solid fa-circle-plus"></i>}
            style={{ fontWeight: 'bold', fontSize: '15px', width: '220px' }}
          >
            Nuevo restaurante
          </Button>
          <Spacer />

          <select style={{ margin: 0, width: '300px' }}>
            <option>Todos los restaurantes</option>
          </select>
        </Row>
      </Card>
    </Container>
  );
};

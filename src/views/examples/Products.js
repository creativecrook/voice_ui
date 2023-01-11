import React from "react";
import {
  Card,
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import eventBus, { clearSubscribe, mainSubject, searchSubscribe } from "../../EventBus";
import { useHistory, withRouter } from "react-router-dom";

const productMock = [
  { product: "Pepsi", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Thumbs Up", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Sprite", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Seven Up", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Fanta", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Maaza", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Fanta", size: "2 Litre", orders: 40, revenue: 45360 },
  { product: "Pepsi", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Thumbs Up", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Sprite", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Seven Up", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Fanta", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Maaza", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Fanta", size: "1 Litre", orders: 40, revenue: 45360 },
  { product: "Pepsi", size: "3 Litre", orders: 40, revenue: 45360 },
  { product: "Thumbs Up", size: "3 Litre", orders: 40, revenue: 45360 },
  { product: "Sprite", size: "3 Litre", orders: 40, revenue: 45360 },
  { product: "Seven Up", size: "3 Litre", orders: 40, revenue: 45360 },
  { product: "Fanta", size: "3 Litre", orders: 40, revenue: 45360 },
  { product: "Maaza", size: "3 Litre", orders: 40, revenue: 45360 },
  { product: "Fanta", size: "3 Litre", orders: 40, revenue: 45360 },
];

const filter = {
  product: "pepsi",
  size: "2 Litre",
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: productMock };
    this.filterProducts = this.filterProducts.bind(this);

    this.searchSub = searchSubscribe.subscribe((data) => {
      console.log(data);
      this.filterData(data);
    });

    this.clearSub = clearSubscribe.subscribe((data) => {
      this.clearData(data);
    });

  }

  clearData(data){
    this.setState((prevState) => ({
      products: productMock,
    }));
    const utterance = (value) => new SpeechSynthesisUtterance(value);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance(`Sure`));
  }

  filterData(data) {
    const strs = data.split(" ").map((v) => v.toLowerCase());
    const utterance = (value) => new SpeechSynthesisUtterance(value);
    utterance.rate = 0.9;
    
    this.setState((prevState) => ({
      products: [],
    }));

    var results = [];

    if (data && strs.length) {
      strs.map((str) => {
        const fi = productMock.filter((o) => {
          return o.product.toLowerCase() == str.toLowerCase();
        });
        fi.map((item) => {
          results.push(item);
        });
        results.concat(fi);
        this.setState((prevState) => ({
          products: prevState.products.concat(fi),
        }));
      });
    }
    const litre = strs.includes("litre");
    if (litre) {
      const sizeindex = strs.indexOf("litre") - 1;
      const size = strs[sizeindex];
      let fi;
      if (results.length) {
        fi = results.filter((o) => {
          return o.size.toLowerCase() == size + " litre";
        });
      } else {
        fi = productMock.filter((o) => {
          return o.size.toLowerCase() == size + " litre";
        });
      }
      this.setState((prevState) => ({
        products: fi,
      }));
      speechSynthesis.speak(
        utterance(`Showing ${fi.length} results for ${data}`)
      );
    } else {
      speechSynthesis.speak(
        utterance(`Showing ${results.length} results for ${data}`)
      );
    }
  }

  gotoAddProduct(){
    // eventBus.dispatch("applySearch", { message: "search for pepsi 2 Litre" });
    // This will navigate to first component
    this.props.history.push(`/admin/addproduct`);
  };

  filterProducts() {
    const fi = productMock.filter((o) => {
      return (
        o.product.toLowerCase() == filter.product.toLowerCase() &&
        o.size.toLowerCase() == filter.size.toLowerCase()
      );
    });
    console.log(fi);
    this.setState((prevState) => ({
      products: fi,
    }));
  }

  componentWillUnmount() {
    this.searchSub.unsubscribe();
    this.clearSub.unsubscribe();
  }

  // this.setState({comment: 'Hello'});

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">
                        Showing {this.state.products.length} Product(s)
                      </h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={(e) => this.gotoAddProduct()}
                        size="sm"
                      >
                        Add new Product
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product name</th>
                      <th scope="col">Size</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((product, index) => (
                      <tr key={index}>
                        <th scope="row">{product.product}</th>
                        <td>{product.size}</td>
                        <td>{product.orders}</td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />{" "}
                          {product.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Products);

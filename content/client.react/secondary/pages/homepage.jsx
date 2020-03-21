"use strict"
const React = require('react')
const OwlCarousel = require('react-owl-carousel').default

class Homepage extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <section className="overflow-hidden">
                    <h1 className="homepage-slider-header">Heal and Recover</h1>
                    <h3 className="homepage-slider-text">Move on to a better life</h3>
                    <OwlCarousel className="owl-theme owl-carousel" smartSpeed={4500} navSpeed={6000} margin={5} autoplay={true} items={1} loop={true}  dots={false}>
                        <div className="item" ><img className="homepage-image-slider" src="../../../images/slider/2.jpg" /></div>
                        <div className="item" ><img className="homepage-image-slider" src="../../../images/slider/6.jpg" /></div>
                        <div className="item" ><img className="homepage-image-slider" src="../../../images/slider/3.jpg" /></div>
                        <div className="item"><img src="../../../images/slider/4.jpg" className="homepage-image-slider" /></div>
                        <div className="item"><img src="../../../images/slider/5.jpg" className="homepage-image-slider" /></div>
           
                    </OwlCarousel>
                </section>

                <div className="container pt90 pb50">
                    <div className="row">
                        <div className="col-md-4 mb40">
                            <div className="icon-card-style1">
                                <i className="icon-lock text-muted bg-faded icon-round-60"></i>
                                <div className="overflow-hiden">
                                    <h4 className="h6 font500">Privacy</h4>
                                    <p className="mb20">
                                    Fine-grained permissions allow you to specify exactly who can see each aspect of your recovery.
                                    </p>
                                    <a href="#" className="btn btn-underline">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb40">
                            <div className="icon-card-style1">
                                <i className="icon-calendar text-muted bg-faded icon-round-60"></i>
                                <div className="overflow-hiden">
                                    <h4 className="h6 font500">Event logging</h4>
                                    <p className="mb20">
                                        Keep track of your trauma entries and appointments for your therapist and supporters to view
                                    </p>
                                    <a href="#" className="btn btn-underline">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb40">
                            <div className="icon-card-style1">
                                <i className="icon-chat text-muted bg-faded icon-round-60"></i>
                                <div className="overflow-hiden">
                                    <h4 className="h6 font500">24/7 Support</h4>
                                    <p className="mb20">
                                        Private messaging between your therapist and clients to help with all your needs.
                                    </p>
                                    <a href="#" className="btn btn-underline">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bg-faded pb80 pt80">
                    <div className="container">
                        <div className="center-title mb50 text-center">
                            <h4>What our customers think</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-8 mr-auto ml-auto">
                                <OwlCarousel className="owl-carousel owl-theme owl-testimonials-full" loop smartSpeed={2000} items={1}>
                                    <div className="item">
                                        <div className="testimonial-full">
                                            <p className="lead">
                                                "If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill."</p>
                                            <div className="clearfix testimonial-author">
                                                <img src="../../../images/team/mike.jpeg" alt="" className="img-fluid float-left mr-3 rounded-circle" width="60" />
                                                <h5 className="font400 h6 mb0 pt5">Mike - </h5>
                                                <small>Wrapbootstrap</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimonial-full">
                                            <p className="lead">
                                                "If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. "
                                                </p>
                                            <div className="clearfix testimonial-author">
                                                <img src="../../theme-versa/images/team-6.jpg" alt="" className="img-fluid float-left mr-3 rounded-circle" width="60" />
                                                <h5 className="font400 h6 mb0 pt5">John Doe - </h5>
                                                <small>Wrapbootstrap</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimonial-full">
                                            <p className="lead">
                                                "If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill"   </p>
                                            <div className="clearfix testimonial-author">
                                                <img src="../../theme-versa/images/team-8.jpg" alt="" className="img-fluid float-left mr-3 rounded-circle" width="60" />
                                                <h5 className="font400 h6 mb0 pt5">John Doe - </h5>
                                                <small>Wrapbootstrap</small>
                                            </div>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                    <div className="container pt90 pb50">
                        <div className="center-title mb50 text-center">
                            <h4>Creative team</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-3 mb50 text-center">
                                <img src="../../../images/team/gregorio.jpg" alt="" className="img-fluid rounded-circle mb20 shadow20" width="150" />
                                <h4>Gregorio Rojas</h4>
                                <span className="font400 text-muted">Marketing manager</span>
                                <ul className="list-inline social-list pt20 pb0 mb0">
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-lg-3 mb50 text-center">
                                <img src="../../../images/team/lilliana.jpg" alt="" className="img-fluid rounded-circle mb20 shadow20" width="150" />
                                <h4>Lilliana Monge</h4>
                                <span className="font400 text-muted">Marketing manager</span>
                                <ul className="list-inline social-list pt20 pb0 mb0">
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-lg-3 mb50 text-center">
                                <img src="../../../images/team/mike.jpeg" alt="" className="img-fluid rounded-circle mb20 shadow20" width="150" />
                                <h4>Mike McGranahan</h4>
                                <span className="font400 text-muted">Marketing manager</span>
                                <ul className="list-inline social-list pt20 pb0 mb0">
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-lg-3 mb50 text-center">
                                <img src="../../../images/team/bw.jpg" alt="" className="img-fluid rounded-circle mb20 shadow20" width="150" />
                                <h4>Angelina Doe</h4>
                                <span className="font400 text-muted">Marketing manager</span>
                                <ul className="list-inline social-list pt20 pb0 mb0">
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-dark pt90 pb90">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 mr-auto ml-auto text-center">
                                    <h3 className="text-white h3 mb20">
                                        Heal and Recover
                                                         </h3>
                                    <p className="lead text-white text-muted mb20">
                                        See the light in each other, be the light for each other
                                                        </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


module.exports = Homepage
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelsOfCars.Contracts;
using ModelsOfCars.Storage.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ModelsOfCars.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarStorage _carStorage;
        public CarsController(ICarStorage carStorage)
        {
            _carStorage = carStorage;
        }

        #region POST

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Guid))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> Create([FromBody] Car car)
        {
            try
            {
                if (car == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Объект машины пуст");
                }

                if(await _carStorage.CheckOnExistWithTheSameParametrs(car).ConfigureAwait(false))
                {
                    return StatusCode(StatusCodes.Status409Conflict, "Машина с данными параметрами уже существует");
                }

                var response = await _carStorage.Create(car).ConfigureAwait(false);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }

        #endregion

        #region GET

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Car))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> GetById(Guid id)
        {
            try
            {
                var response = await _carStorage.GetById(id).ConfigureAwait(false);

                if (response == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Такой машины не существует");
                }

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetAllResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> GetAll([FromQuery] Paging paging)
        {
            try
            {
                if(paging.Size == 0)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Размер страницы не может равняться нулю");
                }

                var response = await _carStorage.GetAllAsync(paging).ConfigureAwait(false);
                var count = await _carStorage.GetCount().ConfigureAwait(false);

                var pageInfo = new PageInfo
                {
                    Current = paging.Current,
                    Size = paging.Size,
                    TotalPages = count / paging.Size
                };

                if(count % paging.Size != 0)
                {
                    pageInfo.TotalPages++;
                }

                return StatusCode(StatusCodes.Status200OK, new GetAllResponse { Response = response, PageInfo = pageInfo });
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> CheckOnExistWithTheSameParametrs(Guid id, Guid brandId, string model, Guid bodyTypeId, uint seatsCount)
        {
            try
            {
                var car = new Car
                {
                    Id = id,
                    BrandId = brandId,
                    Model = model,
                    BodyTypeId = bodyTypeId,
                    SeatsCount = seatsCount
                };

                var response = await _carStorage.CheckOnExistWithTheSameParametrs(car).ConfigureAwait(false);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }

        #endregion

        #region PUT

        [HttpPut("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Guid))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> Update([FromBody] Car car)
        {
            try
            {
                if (car == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "Объект машины пуст");
                }

                if (await _carStorage.CheckOnExistWithTheSameParametrs(car).ConfigureAwait(false))
                {
                    return StatusCode(StatusCodes.Status409Conflict, "Машина с данными параметрами уже существует");
                }

                var response = await _carStorage.Update(car).ConfigureAwait(false);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }

        #endregion

        #region DELETE

        [HttpDelete("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Guid))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> Delete(Guid Id)
        {
            try
            {
                var response = await _carStorage.Delete(Id).ConfigureAwait(false);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }

        #endregion

        #region NESTED CLASSES

        private class GetAllResponse
        {
            public IList<Car> Response { get; set; }
            public PageInfo PageInfo { get; set; }
        }

        #endregion
    }
}

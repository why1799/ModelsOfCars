using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelsOfCars.Contracts;
using ModelsOfCars.Storage.Interfaces;
using System;
using System.Threading.Tasks;

namespace ModelsOfCars.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandStorage _brandStorage;
        public BrandsController(IBrandStorage brandStorage)
        {
            _brandStorage = brandStorage;
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Brand))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var response = await _brandStorage.GetAllAsync().ConfigureAwait(false);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }
    }
}

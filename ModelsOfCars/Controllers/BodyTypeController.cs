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
    public class BodyTypeController : ControllerBase
    {
        private readonly IBodyTypeStorage _bodyTypeStorage;
        public BodyTypeController(IBodyTypeStorage bodyTypeStorage)
        {
            _bodyTypeStorage = bodyTypeStorage;
        }

        [HttpGet("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(BodyType))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(string))]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var response = await _bodyTypeStorage.GetAllAsync().ConfigureAwait(false);

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception exeption)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, exeption.Message);
            }
        }
    }
}


using ExpenseControl.Data.Dto;
using ExpenseControl.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controller
{

    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]

    //Fazer token e hashear senha
    public class PersonController(UnitOfService service) : ControllerBase
    {
        private UnitOfService _service = service;

        
        [HttpGet("{Id}")]
        public ActionResult GetPerson(int Id)
        {
            try{
                var result = _service.PersonService.GetPersonById(Id);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes);
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult CreatePerson(CreatePersonDto dto)
        {
            try{
                var result = _service.PersonService.CreatePerson(dto);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{Id}")]
        public ActionResult DeletePerson(int Id)
        {
            try{
                var result= _service.PersonService.DeletePerson(Id);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());


            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut("{Id}")]
        public ActionResult UpdatePerson(UpdatePersonDto dto, int Id)
        {
            try{
                var result= _service.PersonService.UpdatePerson(dto, Id);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}